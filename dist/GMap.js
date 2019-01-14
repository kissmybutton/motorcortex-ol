"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MC = require("@kissmybutton/motorcortex");

var GMap =
/*#__PURE__*/
function (_MC$Group) {
  _inherits(GMap, _MC$Group);

  function GMap() {
    _classCallCheck(this, GMap);

    return _possibleConstructorReturn(this, _getPrototypeOf(GMap).apply(this, arguments));
  }

  _createClass(GMap, [{
    key: "onGetContext",
    value: function onGetContext() {
      var _this = this;

      var host = this.channel.context.rootElement.querySelectorAll(this.attrs.host)[0]; // console.log(this.channel, this.attrs.host);

      var html = "\n          <html>\n          <head></head>\n          <body>\n          <script async defer src=\"https://maps.googleapis.com/maps/api/js?key=".concat(this.props.API_KEY, "&callback=initMap\"></script>\n            <script>\n              var initMap = () => {\n                console.log(\"Asdfsadf\")\n                var mymap = new google.maps.Map(document.body, ").concat(JSON.stringify(this.props.parameters), ");\n                parent.onMapLoad(mymap,\"").concat(this.id, "\")\n              };\n            </script>\n          </body></html>");
      var css = "";
      var containerParams = {
        width: "100%",
        height: "100%"
      };
      var mapClip = new MC.Clip(null, {
        css: css,
        html: html,
        host: host,
        containerParams: containerParams,
        type: "iframe"
      });
      this.addPassiveIncident(mapClip, 0);

      global.onMapLoad = function (mapRef) {
        _this.props.callback(mapRef);
      };
    }
  }]);

  return GMap;
}(MC.Group);

module.exports = GMap;