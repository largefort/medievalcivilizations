/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Device is ready');
    createGameDirectoryInAppData();
    createGameDirectoryInInternalStorage();
}

function createGameDirectoryInAppData() {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
        dir.getDirectory('MedievalCivilizations', { create: true }, function(subdir) {
            console.log('Directory "MedievalCivilizations" in app data created or already exists');
        }, onError);
    }, onError);
}

function createGameDirectoryInInternalStorage() {
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir) {
        dir.getDirectory('MedievalCivilizations', { create: true }, function(subdir) {
            console.log('Directory "MedievalCivilizations" in internal storage created or already exists');
        }, onError);
    }, onError);
}

function onError(error) {
    console.error('Error: ' + error.code);
}