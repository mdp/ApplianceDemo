var Appliance = require('appliance_shim').ApplianceShim;

$(document).ready(function(){
  var appliance = new Appliance();
  $("#OrientationChange").on('click', function(){
    var o = appliance.getOrientation();
    console.log(o);
    if (o === 'L') {
      appliance.setOrientation('P');
    } else {
      appliance.setOrientation('L');
    }
  });

  $("#VolumeUp").on('click', function(){
    var curVol = appliance.getVolume();
    appliance.setVolume(curVol + 1);
    console.log("Volume was: " + curVol + ", now: " + appliance.getVolume());
  });

  $("#VolumeDown").on('click', function(){
    var curVol = appliance.getVolume();
    appliance.setVolume(curVol - 1);
    console.log("Volume was: " + curVol + ", now: " + appliance.getVolume());
  });

  $("#SetWatchdog").on('click', function(){
    // A watchdog is a safety feature. If you page becomes unresponsive,
    // failing to call the watchdog timer will result in the page
    // being reloaded
    appliance.watchdog(10000); // Unless we call it again, reload in 10s
  });
});


