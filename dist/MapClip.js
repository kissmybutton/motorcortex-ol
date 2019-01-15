"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var MC = require("@kissmybutton/motorcortex");

var helper = new MC.Helper();
var ExtendableClip = MC.ExtendableClip;

var IframeMapContextHandler = require("./IframeMapContextHandler");

var Promise = window.Promise;

var Map = require("ol/Map.js").default;

var View = require("ol/View.js").default; // const { easeIn, easeOut } = require("ol/easing.js");


var TileLayer = require("ol/layer/Tile.js").default; // const { fromLonLat } = require("ol/proj.js");


var OSM = require("ol/source/OSM.js").default;

var _require = require("ol/control.js"),
    Control = _require.Control,
    defaultControls = _require.defaults; // const london = fromLonLat([-0.12755, 51.507222]);
// const moscow = fromLonLat([37.6178, 55.7517]);
// const istanbul = fromLonLat([28.9744, 41.0128]);
// const rome = fromLonLat([12.5, 41.9]);
// const bern = fromLonLat([7.4458, 46.95]);


var MapClip =
/*#__PURE__*/
function (_ExtendableClip) {
  _inherits(MapClip, _ExtendableClip);

  function MapClip() {
    var _this2 = this;

    var _this;

    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MapClip);

    return _possibleConstructorReturn(_this, new Promise(function (resolve, reject) {
      global.resolveMap = resolve;
      props.type = "iframe";

      if (props.mapType === "google") {
        props.html = "\n          <div id=\"map\" class=\"map\"></div>\n          <script>\n            var script = document.createElement(\"script\");\n            script.src=\"https://maps.googleapis.com/maps/api/js?key=".concat(props.API_KEY, "\";\n            script.async = false;\n            script.defer = false;\n            script.onload = () => {\n              console.log(\"here\")\n              var mymap = new google.maps.Map(document.getElementById(\"map\"), ").concat(JSON.stringify(props.parameters), ");\n              parent.onMapLoad(mymap, google, parent.resolveMap);\n            };\n            document.getElementsByTagName(\"head\")[0].appendChild(script);\n            var style = document.createElement(\"style\");\n            style.innerHTML = \"#map{widht:100%;height:100%;} html, body{width:100%;height:100%;}\";\n            document.getElementsByTagName(\"head\")[0].appendChild(style);\n          </script>\n    ");
      } else if (props.mapType === "ol") {
        window.ol = {
          Map: Map,
          TileLayer: TileLayer,
          OSM: OSM,
          View: View,
          Control: Control,
          defaultControls: defaultControls
        };
        props.html = "\n          <div id=\"map\" class=\"map\"></div>\n          <script>\n              window.ol = parent.ol;\n              var script = document.createElement(\"script\");\n              script.src = \"https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL\";\n              script.async = true;\n              script.defer = true;\n              script.onload = () => {\n                var mymap = new ol.Map({\n                  target: document.getElementById(\"map\"),\n                  layers: [\n                    new ol.TileLayer({\n                      preload: 4,\n                      source: new ol.OSM()\n                    })\n                  ],\n                  // Improve user experience by loading tiles while animating. Will make\n                  // animations stutter on mobile or slow devices.\n                  loadTilesWhileAnimating: true,\n                  view: new ol.View({\n                    center: [3225415.454040626, 5014229.844289909],\n                    zoom: 6\n                  })\n                })\n                console.log(\"heere\")\n                parent.onMapLoad(mymap);\n              };\n              document.getElementsByTagName(\"head\")[0].appendChild(script);\n              var style = document.createElement(\"style\");\n              style.innerHTML = \"#map{widht:100%;height:100%;} html, body{width:100%;height:100%;}\";\n              document.getElementsByTagName(\"head\")[0].appendChild(style);\n              var olstyle = document.createElement(\"style\");\n              olstyle.href = \"https://openlayers.org/en/v5.3.0/css/ol.css\";\n              document.getElementsByTagName(\"head\")[0].appendChild(olstyle);\n            </script>";
      }

      _this = _possibleConstructorReturn(_this2, _getPrototypeOf(MapClip).call(_this2, attrs, props));
      _this.props = props;
      _this.props.selector = "";
      _this.props.css = "";

      var checks = _this.runChecks(attrs, props);

      if (!checks) {
        reject(new Error(false));
      }

      var ContextHanlder = null;
      ContextHanlder = IframeMapContextHandler;
      var contextHanlder = new ContextHanlder(props);
      _this.ownContext = contextHanlder.context;
      _this.isTheClip = true;
      _this.attrs = JSON.parse(JSON.stringify(attrs));
      _this.ownContext.mapRef = {};
      _this.onLoad = _this.onLoad.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      global.onMapLoad = _this.onLoad;
    }));
  }

  _createClass(MapClip, [{
    key: "onLoad",
    value: function onLoad(mapRef, google, resolve) {
      this.context.google = google;
      this.context.mapRef = mapRef; // this.props.callback(mapRef);

      window.onMapLoad = undefined; // window.ol = undefined;

      resolve(this);
    }
  }, {
    key: "runChecks",
    value: function runChecks(attrs, props) {
      if (!helper.isObject(props)) {
        helper.error("Self Contained Incident expects an object on its                 second argument on the constructor. ".concat(_typeof(props), " passed"));
        return false;
      }

      if (!props.hasOwnProperty("id")) {
        helper.error("Self Contained Incident expects the 'id' key on its                 constructor properties which is missing");
        return false;
      }

      if (!props.hasOwnProperty("host")) {
        helper.error("Self Contained Incident expects the 'host' key on its             constructor properties which is missing");
        return false;
      }

      if (!props.hasOwnProperty("containerParams")) {
        helper.error("Self Contained Incident expects the 'containerParams'             key on its constructor properties which is missing");
        return false;
      }

      if (!props.hasOwnProperty("mapType")) {
        helper.error("Self Contained Incident expects the 'mapType'             key on its constructor properties which is missing");
        return false;
      }

      if (props.mapType !== "google" && props.mapType !== "ol") {
        helper.error("The mapType key value should either be 'google' or 'ol'");
        return false;
      }

      return true;
    }
  }, {
    key: "lastWish",
    value: function lastWish() {
      this.ownContext.unmount();
    }
  }]);

  return MapClip;
}(ExtendableClip);

module.exports = MapClip;