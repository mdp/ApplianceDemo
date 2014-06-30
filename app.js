(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



},{"appliance_shim":2}],2:[function(require,module,exports){
(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Appliance = factory(root, exports);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    factory(root, exports);

  // Finally, as a browser global.
  } else {
    root.Appliance = factory(root, {});
  }

}(this, function(root, exports) {

  var ApplianceShim = exports.ApplianceShim = function(){
    this.Bridge = window.ApplianceBridge;
    return this;
  }

  // Am I on the Appliance, or on a client device
  // @return Boolean
  ApplianceShim.prototype.available = function() {
    return typeof this.Bridge !== 'undefined';
  }

  // Sets the orientation
  // @params "L" for Landscape, "P" for Portrait
  ApplianceShim.prototype.setOrientation = function(o) {
    if (!this.available()) { return false; }
    this.Bridge.setOrientation(o);
  }

  // Gets the orientation
  // @return String L or P
  ApplianceShim.prototype.getOrientation = function() {
    if (!this.available()) { return false; }
    return this.Bridge.getOrientation();
  }

  // Gets the volume
  // @return int 0-100
  ApplianceShim.prototype.getVolume = function() {
    if (!this.available()) { return false; }
    return this.Bridge.getVolume();
  }

  // Sets the volume
  // @params volume 0-100
  ApplianceShim.prototype.setVolume = function(v) {
    if (!this.available()) { return false; }
    return this.Bridge.setVolume(v);
  }

  // Sets the watchdog timer
  // @params int delay in milliseconds
  // You can set this to 0 if you want to remove it
  // Calling it again resets the timer.
  ApplianceShim.prototype.watchdog = function(ms) {
    if (!this.available()) { return false; }
    this.Bridge.watchdog(ms);
  }

}));

},{}]},{},[1])