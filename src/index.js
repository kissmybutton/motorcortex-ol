import Clip from "./MapClip";
import GoTo from "./GoTo";
import { fromLonLat } from "ol/proj.js";
import packageJSON from "../package.json";

export default {
  npm_name: packageJSON.name, // don't touch this
  version: packageJSON.version, // don't touch this
  incidents: [
    {
      exportable: GoTo,
      name: "GoTo",
      attributesValidationRules: {
        animatedAttrs: {
          type: "object",
          props: {
            goto: {
              type: "object",
              props: {
                zoom: { type: "number", min: 0 },
                center: { type: "array", items: "number", min: 2, max: 2 },
              },
            },
          },
        },
      },
    },
  ],
  compositeAttributes: { goto: ["center", "zoom"] },
  Clip,
  utils: {
    fromLonLat,
  },
};
