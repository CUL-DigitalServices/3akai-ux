/*!
 * Copyright 2014 Digital Services, University of Cambridge Licensed
 * under the Educational Community License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */


define(['jquery', 'underscore', 'oae.core'], function($, _, oae) {

    // Get the publication id from the URL. The expected URL is `/publication/<tenantId>/<publicationId>`.
    // The publication id will then be `p:<tenantId>/<publicationId>`
    // e.g. publication/cam/xkVkSpFJo
    var publicationId = 'p:' + $.url().segment(2) + ':' + $.url().segment(3);
    // Variable used to cache the requested content profile
    var publicationProfile = null;

    /**
     * Get the publication's basic profile and set up the screen. If the publication
     * can't be found or is private to the current user, the appropriate
     * error page will be shown
     */
    var getPublicationProfile = function() {
        oae.api.publication.getPublication(publicationId, function(err, publication) {
            // Cache the publication profile data
            publicationProfile = publication;
            // Set the browser title
            oae.api.util.setBrowserTitle(publicationProfile.displayName);
            // Show the publication preview
            renderPublicationPreview();
            // Show the publication metadata
            setUpPublicationMetaData();
            // Set up push notifications
            setUpPushNotifications();
            // We can now unhide the page
            oae.api.util.showPage();
        });
    };

    /**
     * Renders the publication preview onto the page.
     */
    var renderPublicationPreview = function() {
        var $widgetContainer = $('#publication-preview-container').empty();
        var linkedContentProfile = publicationProfile.linkedContent;
        var widgetId = linkedContentProfile.previews && linkedContentProfile.previews.pageCount ? 'documentpreview' : 'filepreview';
        oae.api.widget.insertWidget(widgetId, null, $widgetContainer, null, linkedContentProfile);
    };

    /**
     * Subscribed to any push notification which would require the content previewer to rerender
     */
    var setUpPushNotifications = function() {
        oae.api.push.subscribe(publicationProfile.linkedContentId, 'activity', publicationProfile.signature, 'internal', false, function(activity) {
            // If the previews have finished, rerender the document previewer
            if (activity['oae:activityType'] === 'previews-finished') {
                // Update the linked content profile in the publicationProfile with the one provided in the activity object
                publicationProfile.linkedContent = activity.object;
                renderPublicationPreview();
            }
        });
    };

    /**
     * Render the publication metadata.
     */
    var setUpPublicationMetaData = function() {
        oae.api.util.template().render($('#publication-metadata-template'), {'publication': publicationProfile}, $('#publication-metadata-container'));

        // Highlight the share URL text when clicking on its input
        $("#publication-share").on("click", function() {
            $(this).select();
        });
    };

    getPublicationProfile();
});
