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

require.config({
    'paths': {
        // jQuery plugins
        'jquery-ui': '/shared/vendor/js/jquery-ui/jquery-ui.custom',
        'jquery.autosuggest': '/shared/vendor/js/jquery-plugins/jquery.autoSuggest',
        'jquery.browse-focus': '/shared/oae/js/jquery-plugins/jquery.browse-focus',
        'jquery.clip': '/shared/oae/js/jquery-plugins/jquery.clip',
        'jquery.dnd-upload': '/shared/oae/js/jquery-plugins/jquery.dnd-upload',
        'jquery.encoder': '/shared/vendor/js/jquery-plugins/jquery.encoder',
        'jquery.fileSize': '/shared/vendor/js/jquery-plugins/jquery.fileSize',
        'jquery.fileupload': '/shared/vendor/js/jquery-plugins/jquery.fileupload',
        'jquery.form': '/shared/vendor/js/jquery-plugins/jquery.form',
        'jquery.history': '/shared/vendor/js/jquery-plugins/jquery.history',
        'jquery.iframe-transport': '/shared/vendor/js/jquery-plugins/jquery.iframe-transport',
        'jquery.infinitescroll': '/shared/oae/js/jquery-plugins/jquery.infinitescroll',
        'jquery.jeditable-focus': '/shared/oae/js/jquery-plugins/jquery.jeditable-focus',
        'jquery.list-header': '/shared/oae/js/jquery-plugins/jquery.list-header',
        'jquery.list-options': '/shared/oae/js/jquery-plugins/jquery.list-options',
        'jquery.parseurl': '/shared/vendor/js/jquery-plugins/jquery.parseurl.oae-edited',
        'jquery.properties-parser': '/shared/vendor/js/jquery-plugins/jquery.properties-parser',
        'jquery.responsive': '/shared/oae/js/jquery-plugins/jquery.responsive',
        'jquery.serializeObject': '/shared/vendor/js/jquery-plugins/jquery.serializeObject',
        'jquery.timeago': '/shared/vendor/js/jquery-plugins/jquery.timeago',
        'jquery.update-picture': '/shared/oae/js/jquery-plugins/jquery.update-picture',
        'jquery.validate': '/shared/vendor/js/jquery-plugins/jquery.validate',

        // Bootstrap
        'bootstrap': '/shared/vendor/js/bootstrap',
        'bootstrap.clickover': '/shared/vendor/js/bootstrap-plugins/bootstrapx.clickover.oae-edited',
        'bootstrap.focus': '/shared/oae/js/bootstrap-plugins/bootstrap.focus',
        'bootstrap.modal': '/shared/oae/js/bootstrap-plugins/bootstrap.modal',
        'bootstrap.notify': '/shared/vendor/js/bootstrap-plugins/bootstrap.notify.oae-edited',

        // Other dependencies
        'globalize': '/shared/vendor/js/l10n/globalize',
        'markdown': '/shared/vendor/js/markdown',
        'sockjs': '/shared/vendor/js/sockjs',
        'text': '/shared/vendor/js/requirejs/require.text',
        'tinycon': '/shared/vendor/js/tinycon',
        'trimpath': '/shared/vendor/js/trimpath',
        'underscore': '/shared/vendor/js/underscore',

        // OAE
        'oae.api': '/shared/oae/api/oae.api',
        'oae.api.authentication': '/shared/oae/api/oae.api.authentication',
        'oae.api.comment': '/shared/oae/api/oae.api.comment',
        'oae.api.config': '/shared/oae/api/oae.api.config',
        'oae.api.content': '/shared/oae/api/oae.api.content',
        'oae.api.discussion': '/shared/oae/api/oae.api.discussion',
        'oae.api.follow': '/shared/oae/api/oae.api.follow',
        'oae.api.group': '/shared/oae/api/oae.api.group',
        'oae.api.i18n': '/shared/oae/api/oae.api.i18n',
        'oae.api.l10n': '/shared/oae/api/oae.api.l10n',
        'oae.api.profile': '/shared/oae/api/oae.api.profile',
        'oae.api.push': '/shared/oae/api/oae.api.push',
        'oae.api.user': '/shared/oae/api/oae.api.user',
        'oae.api.util': '/shared/oae/api/oae.api.util',
        'oae.api.widget': '/shared/oae/api/oae.api.widget',
        'oae.core': '/shared/oae/api/oae.core'
    },
    'shim': {
        'bootstrap.clickover': ['bootstrap'],
        'bootstrap.notify': ['bootstrap']
    }
});

define(['oae.core'], function() {
    'use strict';
});
