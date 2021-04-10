import Clip from "./MapClip";
import GoTo from "./GoTo";
import { fromLonLat } from "ol/proj.js";
import { name, version } from "../package.json";

export default {
  npm_name: name, // don't touch this
  version: version, // don't touch this
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
