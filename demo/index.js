import MC from "@kissmybutton/motorcortex";
import MapsDef from "../src/main";
import Player from "@kissmybutton/motorcortex-player";
import { fromLonLat } from "ol/proj.js";

const london = fromLonLat([-0.12755, 51.507222]);
const moscow = fromLonLat([37.6178, 55.7517]);
const istanbul = fromLonLat([28.9744, 41.0128]);
const rome = fromLonLat([12.5, 41.9]);
const bern = fromLonLat([7.4458, 46.95]);

const Maps = MC.loadPlugin(MapsDef);
const host = document.getElementsByTagName("body")[0];
const containerParams = { width: "100%", height: "100%" };
const map = new Maps.Clip(null, {
  host,
  containerParams,
  parameters: {
    view: {
      center: london,
      zoom: 8
    }
  },
  mapType: "ol"
});

const zoomto1 = new Maps.ZoomTo(
  {
    animatedAttrs: {
      goto: {
        zoom: 3,
        center: bern
      }
    }
  },
  { duration: 4000, selector: "#map" }
);

const zoomto2 = new Maps.ZoomTo(
  {
    animatedAttrs: {
      goto: {
        zoom: 8,
        center: moscow
      }
    }
  },
  { duration: 4000, selector: "#map" }
);

map.addIncident(zoomto1, 4000);
map.addIncident(zoomto2, 8000);

new Player({ clip: map });
