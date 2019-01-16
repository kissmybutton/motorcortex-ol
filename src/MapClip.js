const MC = require("@kissmybutton/motorcortex");
const helper = new MC.Helper();
const ExtendableClip = MC.ExtendableClip;
const WebComponentMapContextHandler = require("./WebComponentMapContextHandler");

const Map = require("ol/Map.js").default;
const View = require("ol/View.js").default;
const TileLayer = require("ol/layer/Tile.js").default;
const OSM = require("ol/source/OSM.js").default;

class MapClip extends ExtendableClip {
  constructor(attrs = {}, props = {}) {
    props.css = "#map{width:100%;height:100%;}";
    props.html = `
      <div id="map" class="map"></div>
      <link rel="stylesheet" href="https://openlayers.org/en/v5.3.0/css/ol.css">`;
    props.selector = "";

    super(attrs, props);

    if (!this.runChecks(attrs, props)) {
      return false;
    }

    this.ownContext = new WebComponentMapContextHandler(props).context;
    this.rootElement = this.context.rootElement;
    this.isTheClip = true;
    this.loadScripts = this.loadScripts.bind(this);
    this.initMap = this.initMap.bind(this);
    this.loadScripts();
    this.initMap();
  }

  initMap() {
    this.context.mapRef = new Map({
      target: this.rootElement.getElementsByClassName("map")[0],
      layers: [
        new TileLayer({
          preload: 4,
          source: new OSM()
        })
      ],
      loadTilesWhileAnimating: true,
      view: new View(this.props.parameters.view)
    });
  }

  loadScripts() {
    const script = document.createElement("script");
    script.src =
      "https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL";
    script.async = true;
    script.defer = true;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  runChecks(attrs, props) {
    if (!helper.isObject(props)) {
      helper.error(`Self Contained Incident expects an object on its \
                second argument on the constructor. ${typeof props} passed`);
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
