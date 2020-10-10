import Clip from "./MapClip";
import ZoomTo from "./ZoomTo";

export default {
  npm_name: "@kissmybutton/motorcortex-ol",
  incidents: [{ exportable: ZoomTo, name: "ZoomTo" }],
  compositeAttributes: { goto: ["center", "zoom"] },
  Clip
};
