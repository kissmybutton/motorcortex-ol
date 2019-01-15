// const MotorCortex = require("@kissmybutton/motorcortex");
const Channel = require("./Channel");
// const GMap = require("./GMap");
const MapClip = require("./MapClip");
const ZoomTo = require("./ZoomTo");

module.exports = {
  npm_name: "@kissmybutton/motorcortex-maps",
  incidents: [
    {
      exportable: MapClip,
      name: "MapClip"
    },
    {
      exportable: ZoomTo,
      name: "ZoomTo"
    }
  ],
  clip: MapClip,
  channel: Channel
};
