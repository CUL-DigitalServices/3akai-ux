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

define([
    'jquery',
    'underscore',
    'oae.core',
    'text!/avocet/templates/fileupload.html',
    'jquery.fileupload',
    'jquery.iframe-transport'
], function($, _, oae, template) {
    'use strict';

    var Fileupload = function(element, options) {
        _.bindAll(this);
        this.$el = $(element);
        this.data = _.extend({}, Fileupload.DEFAULTS, options);
        this.template = _.template(template);
        this.render();
        this.initializeFileupload();
    };

    Fileupload.DEFAULTS = {
        'state': 'idle',
        'error': false
    };

    _.extend(Fileupload.prototype, {
        'initializeFileupload': function() {
            this.$el.fileupload({
                'url': '/api/content/create',
                'dropZone': this.$el,
                'fileInput': this.$el.find('.js-input-upload'),
                'replaceFileInput': false,
                'forceIframeTransport': !$.support.xhrFileUpload && !$.support.xhrFormDataFileUpload,
                'add': this.onFileAdd,
                'progress': this.onUploadProgress,
                'drop': this.onFileDrop
            });
        },
        'onFileAdd': function(event, data) {
            var file = data.files[0];
            var visibility = this.visibility || (this.visibility = oae.api.config.getValue('oae-content', 'visibility', 'files'));

            oae.api.content.createFile(file.name, '', visibility, this.$el, file, [], [], this.onUploadComplete);

            this.data.filename = data.files[0].name;
            this.data.state = 'uploading';
            this.render();
        },
        'onUploadComplete': function(error, data) {
            if (error) {
                this.data.state = 'error';
                this.render();
                this.initializeFileupload();
                return;
            }
            window.location = '/details-form';
        },
        'onFileDrop': function(event, data) {
            // Disable file drag and dropping when the widget is uploading
            if (this.data.state === 'uploading') {
                return false;
            }
            // Only upload the first file if multiple files are dropped onto the dropzone.
            if (data.files.length > 1) {
                data.files = [data.files[0]];
            }
        },
        'onUploadProgress': function(e, data) {
            var percentage = data.loaded / data.total * 100;
            this.$el.find('.js-progress-bar').width(percentage + '%');
        },
        'render': function() {
            this.$el.html(this.template(this.data));
        }
    });

    return Fileupload;
});
