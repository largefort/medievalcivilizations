cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-saf-mediastore.safMediastore",
      "file": "plugins/cordova-plugin-saf-mediastore/www/safMediastore.js",
      "pluginId": "cordova-plugin-saf-mediastore",
      "clobbers": [
        "cordova.plugins.safMediastore"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-saf-mediastore": "0.7.0"
  };
});