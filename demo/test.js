const MotorCortex = require("@kissmybutton/motorcortex/");
const Player = require("@kissmybutton/motorcortex-player/");
const clip = require("./index.js");
// console.log(clip);

const definition = clip.exportState({ unprocessed: true });
definition.props.host = document.getElementById("clip");
const newClip = MotorCortex.ClipFromDefinition(definition);

new Player({
  clip: newClip,
  theme: "transparent on-top",
  preview: false,
  pointerEvents: false
});

// const MC = require("@kissmybutton/motorcortex/");
// const Player = require("@kissmybutton/motorcortex-player/");
// const clip = require("../../mcexpress/clip.js");
// const MotorCortex = require("@kissmybutton/motorcortex/");
// const AnimateDefinition = require("../src/main");
// const animatePlugin = MotorCortex.loadPlugin(AnimateDefinition);
// const definition = clip;

// definition.Incident = MC.Clip;
// definition.plugin_channel_class = MC.Channel;

// definition.incidents[0].incident.Incident = MC.Group;
// definition.incidents[0].incident.plugin_channel_class = MC.Channel;

// definition.incidents[0].incident.incidents[0].incident.Incident = animatePlugin.Animate;
// definition.incidents[0].incident.incidents[0].incident.plugin_channel_class = MC.Channel;

// definition.props.host = document.getElementById("clip");
// const newClip = MC.ClipFromDefinition(definition);

// new Player({
//   clip: newClip,
//   theme: "transparent on-top",
//   preview: false,
//   pointerEvents: false
// });
