"use strict";

// const MotorCortex = require("@kissmybutton/motorcortex");
var Channel = require("./Channel"); // const GMap = require("./GMap");


var MapClip = require("./MapClip");

var ZoomTo = require("./ZoomTo");

module.exports = {
  npm_name: "@kissmybutton/motorcortex-googlemaps",
  incidents: [{
    exportable: MapClip,
    name: "MapClip"
  }, {
    exportable: ZoomTo,
    name: "ZoomTo"
  }],
  clip: MapClip,
  channel: Channel
};