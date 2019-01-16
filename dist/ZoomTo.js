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

var _require = require("ol/easing.js"),
    linear = _require.linear;

var ZoomTo =
/*#__PURE__*/
function (_MC$TimedIncident) {
  _inherits(ZoomTo, _MC$TimedIncident);

  function ZoomTo(attrs, props) {
    var _this;

    _classCallCheck(this, ZoomTo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ZoomTo).call(this, attrs, props));
    _this.previousMs = -100;
    _this.zoomChanged = true;
    _this.onCompleteZoom = _this.onCompleteZoom.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ZoomTo, [{
    key: "getScratchValue",
    value: function getScratchValue()
    /*mcid, attribute*/
    {
      var _goto = {
        zoom: this.context.mapRef.getView().getZoom(),
        center: this.context.mapRef.getView().getCenter()
      };
      return _goto;
    }
  }, {
    key: "onCompleteZoom",
    value: function onCompleteZoom() {
      this.zoomChanged = true;
    }
  }, {
    key: "onCompleteCenter",
    value: function onCompleteCenter() {
      this.centerChanged = true;
    }
  }, {
    key: "onProgress",
    value: function onProgress(progress, millisecond) {
      for (var key in this.attrs.animatedAttrs) {
        var delta = Math.abs(this.previousMs - millisecond);

        if (this.zoomChanged && delta > 80 || progress >= 1 || progress <= 0) {
          var view = this.context.mapRef.getView();
          var initialValue = this.getInitialValue(key);
          var initialZoom = initialValue.zoom;
          var attributesZoom = this.attrs.animatedAttrs.goto.zoom;
          var calcZoom = initialZoom - attributesZoom;
          var zoom = initialZoom - calcZoom * progress;
          var initialCenterX = initialValue.center[0];
          var attributesCenterX = this.attrs.animatedAttrs.goto.center[0];
          var calcCenterX = initialCenterX - attributesCenterX;
          var x = initialCenterX - calcCenterX * progress;
          var initialCenterY = initialValue.center[1];
          var attributesCenterY = this.attrs.animatedAttrs.goto.center[1];
          var calcCenterY = initialCenterY - attributesCenterY;
          var y = initialCenterY - calcCenterY * progress;
          view.cancelAnimations();
          view.animate({
            center: [x, y],
            zoom: zoom,
            duration: delta,
            easing: linear
          }, this.onCompleteZoom);
          this.zoomChanged = false;
          this.previousMs = millisecond;
        }
      }
    }
  }]);

  return ZoomTo;
}(MC.TimedIncident);

module.exports = ZoomTo;