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
    inAndOut = _require.inAndOut;

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
    _this.init = _this.init.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ZoomTo, [{
    key: "onGetContext",
    value: function onGetContext() {
      global.map = this.context.mapRef;
      this.view = this.context.mapRef.getView();
      this.init(this.attrs.animatedAttrs.goto);
    }
  }, {
    key: "getScratchValue",
    value: function getScratchValue()
    /*mcid, attribute*/
    {
      var _goto = {
        zoom: this.context.mapRef.getView().getZoom(),
        center: this.context.mapRef.getView().getCenter(),
        rotation: this.context.mapRef.getView().getRotation()
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
    key: "init",
    value: function init(options) {
      var initialValue = this.getInitialValue("goto");
      var center = initialValue.center.slice();
      var resolution = this.view.getResolutionForZoom(initialValue.zoom);
      var rotation = initialValue.rotation;
      this.animation = {
        anchor: options.anchor,
        easing: options.easing || inAndOut
      };

      if (options.center) {
        this.animation.sourceCenter = center;
        this.animation.targetCenter = options.center;
      }

      if (options.zoom !== undefined) {
        this.animation.sourceResolution = resolution;
        this.animation.targetResolution = this.view.constrainResolution(this.view.maxResolution_, options.zoom - this.view.minZoom_, 0);
      } else if (options.resolution) {
        this.animation.sourceResolution = resolution;
        this.animation.targetResolution = options.resolution;
      }

      if (options.rotation !== undefined) {
        this.animation.sourceRotation = rotation;
        var delta = (options.rotation - rotation + Math.PI) % (2 * Math.PI) - Math.PI;
        this.animation.targetRotation = rotation + delta;
      }
    }
  }, {
    key: "animate",
    value: function animate(progress) {
      progress = this.animation.easing(progress);

      if (this.animation.sourceCenter) {
        var x0 = this.animation.sourceCenter[0];
        var y0 = this.animation.sourceCenter[1];
        var x1 = this.animation.targetCenter[0];
        var y1 = this.animation.targetCenter[1];
        var x = x0 + progress * (x1 - x0);
        var y = y0 + progress * (y1 - y0);
        this.view.setCenter([x, y]);
      }

      if (this.animation.sourceResolution && this.animation.targetResolution) {
        var resolution = progress === 1 ? this.animation.targetResolution : this.animation.sourceResolution + progress * (this.animation.targetResolution - this.animation.sourceResolution);

        if (this.animation.anchor) {
          this.view.setCenter(this.view.calculateCenterZoom(resolution, this.animation.anchor));
        }

        this.view.setResolution(resolution);
      }

      if (this.animation.sourceRotation !== undefined && this.animation.targetRotation !== undefined) {
        var rotation = progress === 1 ? (this.animation.targetRotation + Math.PI) % (2 * Math.PI) - Math.PI : this.animation.sourceRotation + progress * (this.animation.targetRotation - this.animation.sourceRotation);

        if (this.animation.anchor) {
          this.view.setCenter(this.view.calculateCenterRotate(rotation, this.animation.anchor));
        }

        this.view.setRotation(rotation);
      }
    }
  }, {
    key: "onProgress",
    value: function onProgress(progress
    /*, millisecond*/
    ) {
      this.animate(progress);
    }
  }]);

  return ZoomTo;
}(MC.TimedIncident);

module.exports = ZoomTo;