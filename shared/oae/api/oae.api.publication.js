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

define(['exports', 'jquery', 'underscore', 'oae.api.util'], function(exports, $, _, utilAPI) {

    /**
     * Get a full publication profile.
     *
     * @param  {String}       publicationId           Id of the publication we're trying to retrieve
     * @param  {Function}     callback                Standard callback method
     * @param  {Object}       callback.err            Error object containing error code and error message
     * @param  {Content}      callback.publication    Publication object representing the retrieved publication
     * @throws {Error}                                Error thrown when no publication id has been provided
     */
    var getPublication = exports.getPublication = function(publicationId, callback) {
        if (!publicationId) {
            throw new Error('A valid publication id should be provided');
        }

        $.ajax({
            'url': '/api/publications/' + publicationId,
            'success': function(data) {
                callback(null, data);
            },
            'error': function(jqXHR, textStatus) {
                callback({'code': jqXHR.status, 'msg': jqXHR.responseText});
            }
        });
    };

    /**
     * Create a new publication.
     *
     * @param  {String}          displayName              Display title for the created publication
     * @param  {String}          correspondingAuthor      The name of the corresponding author of the publication
     * @param  {String}          journalName              The name of the journal the publication is published in
     * @param  {String[]}        funders                  An Array of names of funders who funded the publication, custom funder names should be using the 'other:<funderName>' format
     * @param  {String}          contactEmail             The email of the person who should be contacted regarding the submission of this publication
     * @param  {Boolean}         useCambridgeAddendum     Whether the submitter will use the Cambridge Authors' Addendum
     * @param  {String}          comments                 Free text containing comments or questions on the publication submission
     * @param  {Element|String}  $fileUploadField         jQuery element or selector for that jQuery element representing the file upload form field that has been used to initialise jQuery.fileupload
     * @param  {Object}          file                     jQuery.fileUpload object that was returned when selecting the file that needed to be uploaded
     * @param  {Function}        [callback]               Standard callback method
     * @param  {Object}          [callback.err]           Error object containing error code and error message
     * @param  {Publication}     [callback.publication]   Publication object representing the created publication
     */
    var createPublication = exports.createPublication = function(displayName, correspondingAuthor, department, journalName, acceptanceDate, funders, contactEmail, useCambridgeAddendum, comments, $fileUploadField, file, callback) {
        // Set a default callback function in case no callback function has been provided
        callback = callback || function() {};

        if (!$fileUploadField.length) {
            throw new Error('No file upload field provided');
        } else if (!file) {
            throw new Error('No file provided');
        }

        // jQuery.fileupload requires sending the other form data as a .serializeArray object
        // http://api.jquery.com/serializeArray/
        var data = [
            {'name': 'displayName', 'value': displayName},
            {'name': 'authors', 'value': correspondingAuthor},
            {'name': 'department', 'value': department},
            {'name': 'journalName', 'value': journalName},
            {'name': 'contactEmail', 'value': contactEmail},
            {'name': 'useCambridgeAddendum', 'value': useCambridgeAddendum},
            {'name': 'comments', 'value': comments},

            // Auto-generated values. These are required by the publications API
            {'name': 'sourceIds', 'value': _generateUserSourceId()},
            {'name': 'date', 'value': new Date().getTime()},
            {'name': 'publicationType', 'value': 'other'}
        ];

        // Add the acceptance date to the data array if one is provided.
        if (acceptanceDate) {
            data.push({'name': 'acceptanceDate', 'value': acceptanceDate});
        }

        // Add the funders to the data array
        _.each(funders, function(funder) {
            data.push({
                'name': 'funders',
                'value': funder
            });
        });

        $fileUploadField.fileupload('send', {
            'files': [file],
            'formData': data,
            'success': function(data) {
                // The response will return as text/plain to avoid IE9 trying to download
                // the response when using the iFrame fallback upload solution

                // In IE9 the response is a jQuery object. In this case we have
                // to extract the data found in the inner pre tag.
                if (data instanceof $) {
                    data = data.find('pre').text();
                }
                callback(null, JSON.parse(data));
            },
            'error': function(jqXHR, textStatus) {
                callback({'code': jqXHR.status, 'msg': jqXHR.responseText});
            }
        });
    };

    /**
     * Get the publications uploaded by the current user.
     *
     * @param  {Function}        callback               Standard callback method
     * @param  {Object}          callback.err           Error object containing error code and error message
     * @param  {Publication[]}   callback.publication   List of publications representing the publications uploaded by the current user
     */
    var getMyUploads = exports.getMyUploads = function(callback) {
        $.ajax({
            'url': '/api/publications/uploads/' + require('oae.core').data.me.id,
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
     * @return {String}         The generated source ID of the form "user#ID" where ID is an opaque random ID
     * @api private
     */
    var _generateUserSourceId = function() {
        var userId = require("oae.core").data.me.id;
        return "user#" + userId + "#" + utilAPI.generateId();
    };
});
