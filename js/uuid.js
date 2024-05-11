var deviceName
var deviceUID
var deviceOs
var deviceOsVersion
document.addEventListener("deviceready", onDeviceReady, false)
function onDeviceReady() {
deviceName = device.name;
deviceUID = device.uuid;
deviceOs = device.platform;
deviceOsVersion = device.version;
//Use device information as required
// userDetails(deviceUID);
console.log("devicename : " + deviceName + " deviceId: " + deviceUID + " deviceOs: " + deviceOs + " deviceosversion : " + deviceOsVersion);

 }
   //Use device information as required
   // userDetails(deviceUID);
  console.log("devicename : " + deviceName + " deviceId: " + deviceUID + "     deviceOs: " + deviceOs + " deviceosversion : " + deviceOsVersion);