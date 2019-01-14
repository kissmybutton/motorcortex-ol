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

var ZoomTo =
/*#__PURE__*/
function (_MC$TimedIncident) {
  _inherits(ZoomTo, _MC$TimedIncident);

  function ZoomTo(attrs, props) {
    var _this;

    _classCallCheck(this, ZoomTo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ZoomTo).call(this, attrs, props));
    _this.previousMillisecondZoom = 0;
    _this.previousMillisecondCenter = 0;
    _this.zoomChanged = true;
    _this.centerChanged = true;
    return _this;
  }

  _createClass(ZoomTo, [{
    key: "onGetContext",
    value: function onGetContext() {
      var _this2 = this;

      this.context.mapRef.addListener("zoom_changed", function () {
        _this2.zoomChanged = true; // be prepared for the user zoom action
      });
      this.context.mapRef.addListener("center_changed", function () {
        _this2.centerChanged = true; // be prepared for the user zoom action
      });
    }
  }, {
    key: "getScratchValue",
    value: function getScratchValue(mcid, attribute) {
      if (attribute == "center") {
        return {
          lat: this.context.mapRef.center.lat(),
          lng: this.context.mapRef.center.lng()
        };
      }

      return this.context.mapRef[attribute];
    }
  }, {
    key: "onProgress",
    value: function onProgress(progress
    /*, millisecond*/
    ) {
      for (var key in this.attrs.animatedAttrs) {
        var initialValue = this.getInitialValue(key);

        if (key === "zoom") {
          var zoom = Math.round(initialValue - (initialValue - this.attrs.animatedAttrs.zoom) * progress);

          if (zoom != this.context.mapRef.zoom && this.centerChanged && this.zoomChanged) {
            this.zoomChanged = false;
            this.context.mapRef.setZoom(zoom);
          }
        }

        if (key === "center" && this.centerChanged && this.zoomChanged) {
          this.centerChanged = false;
          var calcLat = initialValue.lat - (initialValue.lat - this.attrs.animatedAttrs.center.lat) * progress;
          var calcLng = initialValue.lng - (initialValue.lng - this.attrs.animatedAttrs.center.lng) * progress;
          this.context.mapRef.setCenter(new this.context.google.maps.LatLng(calcLat, calcLng));
        }
      }
    }
  }]);

  return ZoomTo;
}(MC.TimedIncident);

module.exports = ZoomTo;