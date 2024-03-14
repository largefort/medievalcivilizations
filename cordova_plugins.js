cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-play-install-referrer.PlayInstallReferrer",
      "file": "plugins/cordova-play-install-referrer/www/play_install_referrer.js",
      "pluginId": "cordova-play-install-referrer",
      "clobbers": [
        "PlayInstallReferrer"
      ]
    },
    {
      "id": "cordova-plugin-consent.Consent",
      "file": "plugins/cordova-plugin-consent/www/consent.js",
      "pluginId": "cordova-plugin-consent",
      "clobbers": [
        "consent"
      ]
    },
    {
      "id": "cordova-plugin-admobpro.AdMob",
      "file": "plugins/cordova-plugin-admobpro/www/AdMob.js",
      "pluginId": "cordova-plugin-admobpro",
      "clobbers": [
        "window.AdMob"
      ]
    },
    {
      "id": "cordova-plugin-purchase.CdvPurchase",
      "file": "plugins/cordova-plugin-purchase/www/store.js",
      "pluginId": "cordova-plugin-purchase",
      "clobbers": [
        "store",
        "CdvPurchase"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-admobsdk": "8.13.0",
    "cordova-play-install-referrer": "1.0.1",
    "cordova-play-services-version-adapter": "1.0.2",
    "cordova-plugin-admob-frameworks": "1.2.1",
    "cordova-plugin-androidx-adapter": "1.1.3",
    "cordova-plugin-consent": "3.0.0-alpha.6",
    "cordova-plugin-extension": "1.6.0",
    "cordova-plugin-admobpro": "8.13.1",
    "cordova-plugin-purchase": "13.10.1",
    "cordova-plugin-splashscreen": "6.0.1"
  };
});