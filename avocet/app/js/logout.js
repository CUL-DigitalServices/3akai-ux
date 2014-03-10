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
    'text!../templates/logout.html'
], function($, _, oae, template) {
    'use strict';

    var LogOut = function(element) {
        _.bindAll(this);
        this.$el = $(element)
        this.template = _.template(template);
        this.render();
        this.bindEvents();
    };

    _.extend(LogOut.prototype, {
        'render': function() {
            this.$el.html(this.template());
        },
        'bindEvents': function() {
            this.$el.on('click', '.js-btn-logout', this.onLogOutClick);
        },
        'onLogOutClick': function(event) {
            event.preventDefault();
            oae.api.authentication.logout(function() {
                window.location = '/';
            });
        }
    });

    return LogOut;
});
