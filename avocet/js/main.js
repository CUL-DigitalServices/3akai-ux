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
        // jQuery
        'jquery': '/avocet/components/jquery/dist/jquery',
        'jquery.autosuggest': '/shared/vendor/js/jquery-plugins/jquery.autoSuggest',
        'jquery.browse-focus': '/shared/oae/js/jquery-plugins/jquery.browse-focus',
        'jquery.clip': '/shared/oae/js/jquery-plugins/jquery.clip',
        'jquery.dnd-upload': '/shared/oae/js/jquery-plugins/jquery.dnd-upload',
        'jquery.encoder': '/shared/vendor/js/jquery-plugins/jquery.encoder',
        'jquery.fileSize': '/shared/vendor/js/jquery-plugins/jquery.fileSize',
        'jquery.fileupload': '/shared/vendor/js/jquery-plugins/jquery.fileupload',
        'jquery.form': '/shared/vendor/js/jquery-plugins/jquery.form',
        'jquery.iframe-transport': '/shared/vendor/js/jquery-plugins/jquery.iframe-transport',
        'jquery.infinitescroll': '/shared/oae/js/jquery-plugins/jquery.infinitescroll',
        'jquery.jeditable-focus': '/shared/oae/js/jquery-plugins/jquery.jeditable-focus',
        'jquery.list-options': '/shared/oae/js/jquery-plugins/jquery.list-options',
        'jquery.parseurl': '/shared/vendor/js/jquery-plugins/jquery.parseurl.oae-edited',
        'jquery.properties-parser': '/shared/vendor/js/jquery-plugins/jquery.properties-parser',
        'jquery.serializeObject': '/shared/vendor/js/jquery-plugins/jquery.serializeObject',
        'jquery.timeago': '/shared/vendor/js/jquery-plugins/jquery.timeago',
        'jquery-ui': '/shared/vendor/js/jquery-ui/jquery-ui.custom',
        'jquery.update-picture': '/shared/oae/js/jquery-plugins/jquery.update-picture',
        'jquery.validate': '/shared/vendor/js/jquery-plugins/jquery.validate',

        // Bootstrap
        'bootstrap': '/avocet/vendor/bootstrap/js/bootstrap',
        'bootstrap.clickover': '/shared/vendor/js/bootstrap-plugins/bootstrapx.clickover',
        'bootstrap.notify': '/shared/vendor/js/bootstrap-plugins/bootstrap.notify',
        'bootstrap.focus': '/shared/oae/js/bootstrap-plugins/bootstrap.focus',
        'bootstrap.modal': '/shared/oae/js/bootstrap-plugins/bootstrap.modal',

        // Other dependencies
        'globalize': '/shared/vendor/js/l10n/globalize',
        'sockjs': '/shared/vendor/js/sockjs',
        'text': '/shared/vendor/js/requirejs/require.text',
        'trimpath': '/shared/vendor/js/trimpath',
        'underscore': '/shared/vendor/js/underscore',

        // OAE
        'oae.api': '/shared/oae/api/oae.api',
        'oae.api.authentication': '/shared/oae/api/oae.api.authentication',
        'oae.api.config': '/shared/oae/api/oae.api.config',
        'oae.api.content': '/shared/oae/api/oae.api.content',
        'oae.api.comment': '/shared/oae/api/oae.api.comment',
        'oae.api.discussion': '/shared/oae/api/oae.api.discussion',
        'oae.api.follow': '/shared/oae/api/oae.api.follow',
        'oae.api.group': '/shared/oae/api/oae.api.group',
        'oae.api.i18n': '/shared/oae/api/oae.api.i18n',
        'oae.api.l10n': '/shared/oae/api/oae.api.l10n',
        'oae.api.profile': '/shared/oae/api/oae.api.profile',
        'oae.api.publication': '/shared/oae/api/oae.api.publication',
        'oae.api.push': '/shared/oae/api/oae.api.push',
        'oae.api.user': '/shared/oae/api/oae.api.user',
        'oae.api.util': '/shared/oae/api/oae.api.util',
        'oae.api.widget': '/shared/oae/api/oae.api.widget',
        'oae.core': '/shared/oae/api/oae.core',

        // OA (avocet)
        'oa.details-form': '/avocet/js/details-form',
        'oa.multi-add': '/avocet/js/multi-add'
    },
    'shim': {
        'bootstrap': ['jquery'],
        'bootstrap.clickover': ['bootstrap'],
        'bootstrap.notify': ['bootstrap'],
        'bootstrap.focus': ['bootstrap'],
        'bootstrap.modal': ['bootstrap']
    }
});

define([
    'jquery',
    'oae.core'
], function($) {
    'use strict';

    var widgets = {
        'details-form': 'oa.details-form'
    };

    $(function() {
        $('[data-oa-widget]').each(function() {
            var element = this;
            var widget = widgets[$(this).data('oa-widget')];
            if (widget) {
                require([widget], function(Widget) {
                    new Widget(element);
                });
            }
        });
    });
});
