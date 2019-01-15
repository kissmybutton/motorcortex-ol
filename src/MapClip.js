const MC = require("@kissmybutton/motorcortex");
const helper = new MC.Helper();
const ExtendableClip = MC.ExtendableClip;
const IframeMapContextHandler = require("./IframeMapContextHandler");
const Promise = window.Promise;
const Map = require("ol/Map.js").default;
const View = require("ol/View.js").default;
// const { easeIn, easeOut } = require("ol/easing.js");
const TileLayer = require("ol/layer/Tile.js").default;
// const { fromLonLat } = require("ol/proj.js");
const OSM = require("ol/source/OSM.js").default;
const { Control, defaults: defaultControls } = require("ol/control.js");
// const london = fromLonLat([-0.12755, 51.507222]);
// const moscow = fromLonLat([37.6178, 55.7517]);
// const istanbul = fromLonLat([28.9744, 41.0128]);
// const rome = fromLonLat([12.5, 41.9]);
// const bern = fromLonLat([7.4458, 46.95]);

class MapClip extends ExtendableClip {
  constructor(attrs = {}, props = {}) {
    return new Promise((resolve, reject) => {
      global.resolveMap = resolve;
      props.type = "iframe";
      if (props.mapType === "google") {
        props.html = `
          <div id="map" class="map"></div>
          <script>
            var script = document.createElement("script");
            script.src="https://maps.googleapis.com/maps/api/js?key=${
              props.API_KEY
            }";
            script.async = false;
            script.defer = false;
            script.onload = () => {
              console.log("here")
              var mymap = new google.maps.Map(document.getElementById("map"), ${JSON.stringify(
                props.parameters
              )});
              parent.onMapLoad(mymap, google, parent.resolveMap);
            };
            document.getElementsByTagName("head")[0].appendChild(script);
            var style = document.createElement("style");
            style.innerHTML = "#map{widht:100%;height:100%;} html, body{width:100%;height:100%;}";
            document.getElementsByTagName("head")[0].appendChild(style);
          </script>
    `;
      } else if (props.mapType === "ol") {
        window.ol = {
          Map,
          TileLayer,
          OSM,
          View,
          Control,
          defaultControls
        };

        props.html = `
          <div id="map" class="map"></div>
          <script>
              window.ol = parent.ol;
              var script = document.createElement("script");
              script.src = "https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL";
              script.async = true;
              script.defer = true;
              script.onload = () => {
                var mymap = new ol.Map({
                  target: document.getElementById("map"),
                  layers: [
                    new ol.TileLayer({
                      preload: 4,
                      source: new ol.OSM()
                    })
                  ],
                  // Improve user experience by loading tiles while animating. Will make
                  // animations stutter on mobile or slow devices.
                  loadTilesWhileAnimating: true,
                  view: new ol.View({
                    center: [3225415.454040626, 5014229.844289909],
                    zoom: 6
                  })
                })
                console.log("heere")
                parent.onMapLoad(mymap);
              };
              document.getElementsByTagName("head")[0].appendChild(script);
              var style = document.createElement("style");
              style.innerHTML = "#map{widht:100%;height:100%;} html, body{width:100%;height:100%;}";
              document.getElementsByTagName("head")[0].appendChild(style);
              var olstyle = document.createElement("style");
              olstyle.href = "https://openlayers.org/en/v5.3.0/css/ol.css";
              document.getElementsByTagName("head")[0].appendChild(olstyle);
            </script>`;
      }

      super(attrs, props);
      this.props = props;
      this.props.selector = "";
      this.props.css = "";

      const checks = this.runChecks(attrs, props);

      if (!checks) {
        reject(new Error(false));
      }

      let ContextHanlder = null;
      ContextHanlder = IframeMapContextHandler;

      const contextHanlder = new ContextHanlder(props);

      this.ownContext = contextHanlder.context;
      this.isTheClip = true;

      this.attrs = JSON.parse(JSON.stringify(attrs));

      this.ownContext.mapRef = {};
      this.onLoad = this.onLoad.bind(this);
      global.onMapLoad = this.onLoad;
    });
  }

  onLoad(mapRef, google, resolve) {
    this.context.google = google;
    this.context.mapRef = mapRef;
    // this.props.callback(mapRef);
    window.onMapLoad = undefined;
    // window.ol = undefined;
    resolve(this);
  }

  runChecks(attrs, props) {
    if (!helper.isObject(props)) {
      helper.error(`Self Contained Incident expects an object on its \
                second argument on the constructor. ${typeof props} passed`);
      return false;
    }

    if (!props.hasOwnProperty("id")) {
      helper.error(`Self Contained Incident expects the 'id' key on its \
                constructor properties which is missing`);
      return false;
    }

    if (!props.hasOwnProperty("host")) {
      helper.error(`Self Contained Incident expects the 'host' key on its\
             constructor properties which is missing`);
      return false;
    }

    if (!props.hasOwnProperty("containerParams")) {
      helper.error(`Self Contained Incident expects the 'containerParams'\
             key on its constructor properties which is missing`);
      return false;
    }

    if (!props.hasOwnProperty("mapType")) {
      helper.error(`Self Contained Incident expects the 'mapType'\
             key on its constructor properties which is missing`);
      return false;
    }

    if (props.mapType !== "google" && props.mapType !== "ol") {
      helper.error(`The mapType key value should either be 'google' or 'ol'`);
      return false;
    }

    return true;
  }

  lastWish() {
    this.ownContext.unmount();
  }
}

module.exports = MapClip;
