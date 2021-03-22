import Clip from "./MapClip";
import ZoomTo from "./ZoomTo";
import { fromLonLat } from "ol/proj.js";

export default {
  npm_name: "@kissmybutton/motorcortex-ol",
  incidents: [
    {
      exportable: ZoomTo,
      name: "ZoomTo",
      attributesValidationRules: {
        animatedAttrs: {
          type: "object",
          props: {
            goto: {
              type: "object",
              props: {
                zoom: { type: "number", min: 0 },
                center: { type: "array", items: "number", min: 2, max: 2 }
              }
            }
          }
        }
      }
    }
  ],
  compositeAttributes: { goto: ["center", "zoom"] },
  Clip,
  utils: {
    fromLonLat
  }
};
