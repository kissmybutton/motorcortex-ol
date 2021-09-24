import MC from "@donkeyclip/motorcortex";
import Player from "@donkeyclip/motorcortex-player";
import MapsDef from "../src/";

const Maps = MC.loadPlugin(MapsDef);

const london = MapsDef.utils.fromLonLat([-0.12755, 51.507222]);
const moscow = MapsDef.utils.fromLonLat([37.6178, 55.7517]);
const bern = MapsDef.utils.fromLonLat([7.4458, 46.95]);

const map = new Maps.Clip(
  {
    parameters: {
      view: { center: london, zoom: 8 },
    },
  },
  {
    host: document.getElementById("clip"),
    containerParams: { width: "1280px", height: "720px" },
  }
);

const gotoBern = new Maps.GoTo(
  {
    animatedAttrs: {
      goto: {
        zoom: 3,
        center: bern,
      },
    },
  },
  { duration: 4000, selector: "!#olmap", easing: "easeInExpo" }
);

const gotoMoscow = new Maps.GoTo(
  {
    animatedAttrs: {
      goto: {
        zoom: 8,
        center: moscow,
      },
    },
  },
  { duration: 4000, selector: "!#olmap", easing: "easeInExpo" }
);

map.addIncident(gotoBern, 0);
map.addIncident(gotoMoscow, 4000);
new Player({ clip: map, theme: "mc-blue", preview: true });
