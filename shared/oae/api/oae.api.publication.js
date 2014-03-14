/*!
 * Copyright 2014 Apereo Foundation (AF) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

define(['exports', 'jquery', 'underscore'], function(exports, $, _) {

    /**
     * Create a publication.
     *
     * @param  {String}          title                    A human readable name for the publication
     * @param  {String}          correspondingAuthorName  The name of the corresponding author of the publication
     * @param  {String}          journalName              The name of the journal the publication is published in
     * @param  {String[]}        funders                  An Array of names of funders who funded the publication
     * @param  {String}          contactEmail             The email of the person who should be contacted regarding the submission of this publication
     * @param  {String}          copyrightStrategy        One of the copyright strategy constants defined in the oae-publications Hilary module
     * @param  {String}          comments                 Free text containing comments or questions on the publication submission
     * @param  {Object}          file                     jQuery.fileUpload object that was returned when selecting the file that needed to be uploaded
     * @param  {Element|String}  $fileuploadElement       jQuery element or selector for that jQuery element representing the file upload form field that has been used to initialise jQuery.fileupload
     * @param  {Function}        [callback]               Standard callback method
     * @param  {Object}          [callback.err]           Error object containing error code and error message
     */
    var createPublication = exports.createPublication = function(
            title,
            correspondingAuthorName,
            journalName,
            funders,
            contactEmail,
            copyrightStrategy,
            comments,
            file,
            $fileUploadElement,
            additionalOptions,
            callback) {

        // Set a default callback function in case no callback function has been provided
        callback = callback || function() {};

        if(!$fileUploadElement.length) {
            throw new Error('No fileuploadElement provided');
        }
        else if(!file) {
            throw new Error('No file provided');
        }

        // Send the file w/ form data
        $fileUploadElement.fileupload('send', {
            'files': [file],
            'formData': [
                {name: 'displayName', value: title},
                {name: 'authors', value: correspondingAuthorName},
                {name: 'journalName', value: journalName},
                {name: 'funders', value: funders},
                {name: 'contactEmail', value: contactEmail},
                {name: 'copyrightStrategy', value: copyrightStrategy},
                {name: 'comments', value: comments},

                // Auto-generated values. These are required by Hilary currently.
                {name: 'sourceIds', value: _generateUserSourceId()},
                {name: 'date', value: new Date().getTime()},
                {name: 'publicationType', value: 'other'}
            ],
            'success': function(data) {
                callback(null, data);
            },
            'error': function(jqXHR, textStatus) {
                callback({'code': jqXHR.status, 'msg': jqXHR.responseText});
            }
        });
    };

    /**
     * Generate a unique ID to use as the source ID of a user submitted
     * publication. A sourceId is used by Hilary to link together semantically
     * equivalent publication records from different sources.
     *
     * @return The generated source ID - a string of the form "user#ID" where ID is an opaque random ID.
     */
    var _generateUserSourceId = function() {
        // Need to load oae.core on demand as it's not available when this
        // module is loaded.
        var oae = require("oae.core");
        var userId = oae.data.me.id;
        var id = oae.api.util.generateId();

        return "user#" + userId + "#" + id;
    };
});
