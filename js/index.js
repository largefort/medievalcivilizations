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
    // Cordova is now initialized. Have fun!
    var admobid = {};
    if (/(android)/i.test(navigator.userAgent)) { //Android
      admobid = {
        banner : 'ca-app-pub-5816082932921993/5439448724',
        interstitial : 'ca-app-pub-5816082932921993/4900570284',
        gotHereMsg1 : 'banner and interstitial have the android IDs'
      };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { //iOS
      admobid = {
        banner : 'Stand in iOS banner ID',
        interstitial: 'stand in iOS interstitial ID',
        gotHereMsg1 : 'banner and interstitial have the iOS IDs'
      };
    } else { //Neither
      admobid = {
        gotHereMsg1 : 'banner and interstitial have no IDs'
      }
    }

    if (window.AdMob) {
      var admob = window.AdMob;
      admob.createBanner ({
        adId : admobid.banner,
        position : admob.AD_POSITION.BOTTOM_CENTER,
        isTesting : false, //False for live ; True for production
        autoShow : true
      });
      admob.prepareInterstitial ({
        adId : admobid.interstitial,
        autoShow : false
      });
      gotHereMsg2 = "window.AdMob is true";
    } else {
      gotHereMsg2 = "window.AdMob is not true";
    }

    //Got an ID and the actual ID's
    document.getElementById("getIdCheck").innerHTML = admobid.gotHereMsg1;
    document.getElementById("bannerId").innerHTML = admobid.banner;
    document.getElementById("interstitialId").innerHTML = admobid.interstitial;
    //window.AdMob is true and banner is created + interstitial is prepared
    document.getElementById("isWindowAdmob").innerHTML = gotHereMsg2;
    //Show interstitial function is executed or has not been executed
    document.getElementById("startInterstitial").onclick = function () {
      if (window.AdMob) {
        var admob = window.AdMob;
        admob.showInterstitial();
        gotHereMsg3 = "Show Interstitial function has been executed";
      } else {
        gotHereMsg3 = "Show Interstitial function has not been executed";
      }
      document.getElementById("checkInterstitial").innerHTML = gotHereMsg3;
    }


    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}