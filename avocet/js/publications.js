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

define(['jquery', 'oae.core', 'globalize'], function($, oae) {

    // Get the publication id from the URL. The expected URL is `/publications/<tenantId>/<publicationId>`.
    // The publication id will then be `p:<tenantId>:<publicationId>`
    // e.g. p:avocet:g1Z-sJMW0n
    var publicationId = 'p:' + $.url().segment(2) + ':' + $.url().segment(3);

    // Variable used to cache the requested content profile
    var publicationProfile = null;

    /**
     * Set up the submission profile by getting the publication associated to the
     * submission, prefill the form and render the file and submission info panels
     */
    var setUpSubmissionProfile = function() {
        oae.api.publication.getPublication(publicationId, function(err, publication) {
            if (err) {
                oae.api.util.redirect().notfound();
            }

            // Cache the publication profile data
            publicationProfile = publication;
            // Set the browser title
            oae.api.util.setBrowserTitle(publicationProfile.displayName);
            // Render the publication info
            renderPublicationInfo();
            // Render the file info
            renderFileInfo();
            // Initialise the form
            initForm();
            // We can now unhide the page
            oae.api.util.showPage();
        });
    };

    /**
     * Render the publication info template
     */
    var renderPublicationInfo = function() {
        var receivedDate = new Date(publicationProfile.date);
        oae.api.util.template().render($('#oa-publicationinfo-template'), {
            'receivedDate': oae.api.l10n.transformDate(receivedDate),
            'referenceNumber': publicationProfile.ticket.externalId
        }, $('#oa-publicationinfo-container'));
    };

    /**
     * Render the file info template
     */
    var renderFileInfo = function() {
        oae.api.util.template().render($('#oa-fileinfo-template'), {
            'fileName': publicationProfile.linkedContent.filename,
            'fileSize': $.fn.fileSize(publicationProfile.linkedContent.size),
        }, $('#oa-fileinfo-container'));
    };

    /**
     * Map a publication to a data structure which can be passed to the publicationform widget.
     *
     * @param  {Object}  publication  A publication returned from the API
     * @return {Object}               Reorganized publication data
     */
    var publicationDataToFormData = function(publication) {
        // Get the funders from the publication object exluding any custom ones (using format 'other:funderName')
        var funders = _.filter(publication.funders, function(funder) {
            return !/^other:/.test(funder);
        });
        // Get the custom funders from the publication object
        var otherFunders = _.difference(publication.funders, funders);
        var otherFundersString = _.map(otherFunders, function(otherFunder) {
            // Remove the 'other:' part from the string
            return otherFunder.substr(6);
        }).join(', ');

        // Default the acceptance date to an empty string
        var acceptanceDateString = '';
        // If an acceptance date is set, convert it to DD/MM/YYYY format
        if (publication.acceptanceDate !== null) {
            // acceptanceDate is a millisecond timestamp representing the date in UTC. We need obtain the local time equivalent of this time in order to have Globalize.format() format it (as you can't tell Globalize to format the UTC representation)
            var dateUTC = new Date(publication.acceptanceDate);
            var dateLocal = new Date(dateUTC.getUTCFullYear(), dateUTC.getUTCMonth(), dateUTC.getUTCDate());
            acceptanceDateString = Globalize.format(dateLocal, 'd', 'en-GB');
        }

        return {
            'title': publication.displayName,
            'authors': publication.authors.join(', '),
            'department': publication.department,
            'journal': publication.journalName,
            'acceptanceDate': acceptanceDateString,
            'hasExternalFunders': funders.length || otherFunders.length ? 'yes' : 'no',
            'funders': otherFunders.length ? funders.concat(['other']) : funders,
            'otherFunders': otherFundersString,
            'comment': publication.comments,
            'email': publication.contactEmail,
            'useCambridgeAddendum': publication.useCambridgeAddendum !== 'false',
            'terms': true
        };
    };

    /**
     * Initialise the form
     */
    var initForm = function() {
        // Fetch and insert the publicationform widget
        oae.api.widget.insertWidget('publicationform', null, $('#oa-publicationform-container'), null, {
            'prefill': publicationDataToFormData(publicationProfile),
            'disabled': true
        });
    };

    setUpSubmissionProfile();
});
