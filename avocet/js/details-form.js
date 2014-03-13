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
    'text!/avocet/templates/details-form.html',
    'oa.multi-add',
    'jquery.validate'
], function($, _, template, MultiAdd) {
    'use strict';

    var DetailsForm = function(element, options) {
        this.$el = $(element);
        this.data = _.extend({}, DetailsForm.DEFAULTS, options);
        this.template = _.template(template);
        this.render();
        this.initializeValidation();
    };

    _.extend(DetailsForm.prototype, {
        'initializeValidation': function() {
            var fundersComponent = this.fundersComponent;
            this.$el.find('form').validate({
                'errorClass': 'help-block',
                'highlight': function(element, errorClass) {
                    $(element).parents('.form-group').addClass('has-error');
                },
                'unhighlight': function(element) {
                    $(element).parents('.form-group').removeClass('has-error');
                },
                'errorPlacement': function(error, element) {
                    $(error).appendTo($(element).parents('.form-group').find('> div'));
                },
                'rules': {
                    'funder': {
                        'required': {
                            'depends': function() {
                                return !fundersComponent.getItems().length;
                            }
                        }
                    }
                }
            });
        },
        'render': function() {
            this.$el.html(this.template(this.data));
            this.postRender();
        },
        'postRender': function() {
            this.fundersComponent = new MultiAdd(this.$el.find('.js-funders'), {
                'placeholder': 'Add funders',
                'title': 'Funders',
                'name': 'funder'
            });
        }
    });

    DetailsForm.DEFAULTS = {
        'fields': {},
        'fileName': 'MyArticle.pdf',
        'fileSize': '200mb',
        'copyrightOptions': [
            {
                'label': 'I would like the University to manage rights on my behalf.',
                'help': 'This means you have the copyright but the University has the right to vitae eros in ante sollicitudin.'
            },
            {
                'label': 'I would like to retain copyright & use a Scholars\' Copyright Addendum.',
                'help': 'This means you nulla arcu, imperdiet vel arcu id, condimentum pulvinar purus.'
            },
            {
                'label': 'I am going to give rights to the publisher.',
                'help': 'This means you nulla arcu, imperdiet vel arcu id, condimentum pulvinar purus.'
            },
            {
                'label': 'I have already given rights to the publisher.',
                'help': 'This means you nulla arcu, imperdiet vel arcu id, condimentum pulvinar purus.'
            }
        ]
    };

    return DetailsForm;
});
