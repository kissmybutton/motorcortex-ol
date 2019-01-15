import MC from "@kissmybutton/motorcortex";
import GoogleMapsDef from "../src/main";
import Player from "@kissmybutton/motorcortex-player";

const GoogleMaps = MC.loadPlugin(GoogleMapsDef);
const host = document.getElementsByTagName("body")[0];
const containerParams = { width: "100%", height: "100%" };
(async () => {
  const map = await new GoogleMaps.MapClip(null, {
    css: "#map{widht:100%;height:100%;",
    html: "",
    host,
    containerParams,
    id: "mymap",
    API_KEY: "AIzaSyA_hEYSWVXFGVfesIRwE6BmQeQzktlKXso",
    parameters: {
      center: {
        lat: 40.586824,
        lng: 22.962594
      },
      zoom: 7,
      disableDefaultUI: true,
      gestureHandling: "none",
      zoomControl: false
    },
    mapType: "google"
  });
  const zoomto = new GoogleMaps.ZoomTo(
    {
      animatedAttrs: {
        zoom: 3
      }
    },
    { duration: 2000, selector: "#map" }
  );

  const zoomto1 = new GoogleMaps.ZoomTo(
    {
      animatedAttrs: {
        center: {
          lat: 51.509865,
          lng: -0.118092
        },
        zoom: 7
      }
    },
    { duration: 2000, selector: "" }
  );

  const zoomto2 = new GoogleMaps.ZoomTo(
    {
      animatedAttrs: {
        center: {
          lat: 40.586824,
          lng: 22.962594
        }
      }
    },
    { duration: 2000, selector: "" }
  );

  map.addIncident(zoomto, 2000);
  map.addIncident(zoomto1, 4000);
  map.addIncident(zoomto2, 8000);
  new Player({ clip: map });
})();

// const map = new GoogleMaps.MapClip(null, {
//   css: "#map{widht:100%;height:100%;",
//   html: "",
//   host,
//   containerParams,
//   id: "mymap",
//   API_KEY: "AIzaSyA_hEYSWVXFGVfesIRwE6BmQeQzktlKXso",
//   parameters: {
//     center: {
//       lat: 40.586824,
//       lng: 22.962594
//     },
//     zoom: 7,
//     disableDefaultUI: true,
//     gestureHandling: "none",
//     zoomControl: false
//   },
//   mapType: "ol",
//   callback: () => {
//     new Player({ clip: map });
//   }
// });
