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

var WebComponentMapContextHandler = require("./WebComponentMapContextHandler");

var Map = require("ol/Map.js").default;

var View = require("ol/View.js").default;

var TileLayer = require("ol/layer/Tile.js").default;

var OSM = require("ol/source/OSM.js").default;

var MapClip =
/*#__PURE__*/
function (_ExtendableClip) {
  _inherits(MapClip, _ExtendableClip);

  function MapClip() {
    var _this;

    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MapClip);

    props.css = "#map{width:100%;height:100%;}";
    props.html = "\n      <div id=\"map\" class=\"map\"></div>\n      <link rel=\"stylesheet\" href=\"https://openlayers.org/en/v5.3.0/css/ol.css\">";
    props.selector = "";
    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapClip).call(this, attrs, props));

    if (!_this.runChecks(attrs, props)) {
      return _possibleConstructorReturn(_this, false);
    }

    _this.ownContext = new WebComponentMapContextHandler(props).context;
    _this.rootElement = _this.context.rootElement;
    _this.isTheClip = true;
    _this.loadScripts = _this.loadScripts.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.initMap = _this.initMap.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    _this.loadScripts();

    _this.initMap();

    return _this;
  }

  _createClass(MapClip, [{
    key: "initMap",
    value: function initMap() {
      this.context.mapRef = new Map({
        target: this.rootElement.getElementsByClassName("map")[0],
        layers: [new TileLayer({
          preload: 4,
          source: new OSM()
        })],
        loadTilesWhileAnimating: true,
        view: new View(this.props.parameters.view)
      });
    }
  }, {
    key: "loadScripts",
    value: function loadScripts() {
      var script = document.createElement("script");
      script.src = "https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL";
      script.async = true;
      script.defer = true;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  }, {
    key: "runChecks",
    value: function runChecks(attrs, props) {
      if (!helper.isObject(props)) {
        helper.error("Self Contained Incident expects an object on its                 second argument on the constructor. ".concat(_typeof(props), " passed"));
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