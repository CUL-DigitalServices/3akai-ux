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

require(['jquery', 'oae.core', '/tests/qunit/js/util.js'], function($, oae, util) {

    module("Unused Translation Keys");

    /**
     * Escapes provided string so that regexp metacharacters in it are used as literal characters.
     *     e.g. `test?(string)` becomes `test\?\(string\)`
     *
     * @param  {String}    input    The string that will be escaped so it can be used as a regular expression
     * @return {String}             The escaped string
     */
    var escapeRegExp = function(input) {
      return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };

    /**
     * Initialize the Unused Keys test
     *
     * @param  {Object}   testData    The testdata containing all files to be tested (html, css, js, properties)
     */
    var unusedTranslationKeysTest = function(testData) {

        /**
         * Run a regular expression test on the provided file.
         *
         * @param  {String}    filePath    The path of the file to test
         * @param  {String}    testFile    The file to test
         * @param  {String}    key         The i18n key to test for
         * @return {Boolean}               `true` if there was a match, `false` otherwise
         */
        var runTest = function(filePath, testFile, key) {
            var regex = new RegExp(escapeRegExp('__MSG__' + key + '__', 'm'));
            if (regex.test(testFile)) {
                return true;
            }
            return false;
        };

        // Loop over all main bundles
        var mainBundleTestedKeys = [];
        $.each(testData.mainBundles, function(mainBundleKey, mainBundle) {
            test(mainBundleKey, function() {
                var mainBundleKeys = _.keys(mainBundle);
                if (mainBundle && mainBundleKeys.length) {
                    // Only select the keys which haven't been tested yet
                    var keysToTest = _.difference(mainBundleKeys, mainBundleTestedKeys);
                    if (keysToTest.length) {
                        // For each key, check if it's used in a widget or main HTML file
                        _.each(keysToTest, function(key) {
                            if (key) {
                                mainBundleTestedKeys.push(key);

                                var toTest = [
                                    testData.mainHTML,
                                    testData.mainJS,
                                    testData.apiJS,
                                    testData.oaePlugins
                                ];

                                var keyUsed = _.some(toTest, function(testFiles) {
                                    return _.some(testFiles, function(testFile, testFilePath) {
                                        return runTest(testFilePath, testFile, key);
                                    });
                                }) || _.some(testData.widgetData, function(widget, widgetId) {
                                    // Check the widgets if they key hasn't been found yet
                                    return runTest(widgetId, widget.html, key) || _.some(widget.js, function(widgetJS) {
                                        return runTest(widgetId, widgetJS, key);
                                    });
                                });

                                if (keyUsed) {
                                    ok(true, '\'' + key + '\' in \'' + mainBundleKey + '\' is used');
                                } else {
                                    ok(false, '\'' + key + '\' in \'' + mainBundleKey + '\' is not being used');
                                }
                            }
                        });
                    } else {
                        ok(true, 'Keys in \'' + mainBundleKey + '\' were already tested.');
                    }
                } else {
                    ok(true, 'No keys in \'' + mainBundleKey + '\'');
                }
            });
        });

        // Check if keys in widgets are being used
        $.each(testData.widgetData, function(widgetId, widget) {
            test(widgetId, function() {
                if (widget.i18n && _.keys(widget.i18n).length) {
                    $.each(widget.i18n, function(bundleKey, bundle) {
                        if (_.keys(bundle).length) {
                            $.each(bundle, function(i18nKey, i18nValue) {
                                if (i18nValue) {
                                    var keyUsed = runTest(widgetId, widget.html, i18nKey) || _.some(widget.js, function(widgetJS) {
                                        return runTest(widgetId, widgetJS, i18nKey);
                                    });

                                    if (keyUsed) {
                                        ok(true, i18nKey + ' in \'' + widgetId + ' - ' + bundleKey + '\' is used');
                                    } else {
                                        ok(false, i18nKey + ' in \'' + widgetId + ' - ' + bundleKey + '\' is not being used');
                                    }
                                }
                            });
                        } else {
                            ok(true, '\'' + widgetId + '\' does not have any keys in \'' + bundleKey + '\'');
                        }
                    });
                } else {
                    ok(true, '\'' + widgetId + '\' does not have any bundles');
                }
            });
        });

        // Start consuming tests again
        QUnit.start(2);
    };

    // Stop consuming QUnit test and load the widgets asynchronous
    QUnit.stop();
    util.loadTestData(unusedTranslationKeysTest);
});
