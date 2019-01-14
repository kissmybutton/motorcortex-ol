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

var MC = require("@kissmybutton/motorcortex"); // const Helper = MC.Helper;


var helper = new MC.Helper();
var ExtendableClip = MC.ExtendableClip; // const conf = MC.conf;

var IframeMapContextHandler = require("./IframeMapContextHandler"); // const promise = Promise;


var MapClip =
/*#__PURE__*/
function (_ExtendableClip) {
  _inherits(MapClip, _ExtendableClip);

  /**
   * @param {object} props - an object that should contain all of the
   * following keys:
   * - html (the html template to render)
   * - css (the css template of the isolated tree)
   * - initParams (optional / the initialisation parameters that will be
   * passed both on the css and the html templates in order to render)
   * - host (an Element object that will host the isolated tree)
   * - containerParams (an object that holds parameters to affect the
   * container of the isolated tree, e.g. width, height etc)
   */
  function MapClip() {
    var _this;

    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MapClip);

    props.type = "iframe";
    props.html = "\n      <html>\n          <head>\n            <script async defer src=\"https://maps.googleapis.com/maps/api/js?key=".concat(props.API_KEY, "&callback=initMap\"></script>\n            <script>\n              var initMap = () => {\n                var mymap = new google.maps.Map(document.body, ").concat(JSON.stringify(props.parameters), ");\n                parent.onMapLoad(mymap, google);\n              };\n            </script>\n          </head>\n          <body>\n          </body></html>\n    ");
    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapClip).call(this, attrs, props));
    _this.props = props;
    _this.props.selector = "";
    _this.props.css = "";

    var checks = _this.runChecks(attrs, props);

    if (!checks) {
      return _possibleConstructorReturn(_this, false);
    }

    var ContextHanlder = null;
    ContextHanlder = IframeMapContextHandler;
    var contextHanlder = new ContextHanlder(props);
    _this.ownContext = contextHanlder.context;
    _this.isTheClip = true;
    _this.attrs = JSON.parse(JSON.stringify(attrs));
    _this.ownContext.mapRef = {};
    _this.onLoad = global.onMapLoad = _this.onLoad.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(MapClip, [{
    key: "onLoad",
    value: function onLoad(mapRef, google) {
      this.context.google = google;
      this.context.mapRef = mapRef;
      this.props.callback(mapRef);
      global.onMapLoad = undefined;
    }
  }, {
    key: "onClipInitialise",
    value: function onClipInitialise() {// console.log(this, window);
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