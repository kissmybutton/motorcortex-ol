import MC from "@kissmybutton/motorcortex";
import MapsDef from "../src/";
import Player from "@kissmybutton/motorcortex-player";
import { fromLonLat } from "ol/proj.js";

const Maps = MC.loadPlugin(MapsDef);
const host = document.getElementsByTagName("body")[0];
const containerParams = { width: "100%", height: "100%" };


const london = fromLonLat([-0.12755, 51.507222]);
const moscow = fromLonLat([37.6178, 55.7517]);
const bern = fromLonLat([7.4458, 46.95]);


const map = new Maps.Clip({
    parameters: {
      view: {
        center: london,
        zoom: 8
      }
    },
  },{
    host,
    containerParams,
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
  { duration: 4000, selector: "!#olmap" }
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
  { duration: 4000, selector: "!#olmap" }
);
map.addIncident(zoomto1, 0);
map.addIncident(zoomto2, 4000);

new Player({ clip: map,theme:"mc-blue" });
