"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MC = require("@kissmybutton/motorcortex");

var helper = new MC.Helper();

var WebComponentMapContextHandler =
/*#__PURE__*/
function () {
  function WebComponentMapContextHandler() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WebComponentMapContextHandler);

    if (!helper.isObject(props)) {
      helper.error("ContextHandler expects an object on its constructor. ".concat(_typeof(props), " passed"));
      return false;
    }

    if (!props.hasOwnProperty("html")) {
      helper.error("ContextHandler expects the html key on its constructor properties which is missing");
      return false;
    }

    if (!props.hasOwnProperty("css")) {
      helper.error("ContextHandler expects the css key on its constructor properties which is missing");
      return false;
    }

    if (!props.hasOwnProperty("initParams")) {
      helper.info("ContextHandler got null initParams");
      props.initParams = {};
    }

    if (!props.hasOwnProperty("host")) {
      helper.error("ContextHandler expects the host key on its constructor properties which is missing");
      return false;
    }

    this.isDOM = true;
    var shadow = props.host.attachShadow({
      mode: "closed"
    });
    var wrapper = document.createElement("div");

    if (props.hasOwnProperty("containerParams")) {
      if (props.containerParams.hasOwnProperty("width")) {
        wrapper.style.width = props.containerParams.width;
      }

      if (props.containerParams.hasOwnProperty("height")) {
        wrapper.style.height = props.containerParams.height;
      }
    }

    wrapper.innerHTML = helper.renderTemplate(props.html + "<slot></slot>", {
      params: props.initParams
    });
    shadow.appendChild(wrapper);
    var styleTag = document.createElement("style");
    styleTag.type = "text/css";

    if (styleTag.styleSheet) {
      styleTag.styleSheet.cssText = helper.renderTemplate(props.css, {
        params: props.initParams
      });
    } else {
      styleTag.appendChild(document.createTextNode(props.css));
    }

    shadow.appendChild(styleTag);

    if (props.hasOwnProperty("fonts")) {
      for (var i = 0; i < props.fonts.length; i++) {
        var theFont = props.fonts[i];

        if (theFont.type === "google-font") {
          var fontTag = document.createElement("link");
          fontTag.setAttribute("rel", "stylesheet");
          fontTag.setAttribute("src", theFont.src);
          shadow.appendChild(fontTag);
        }
      }
    }

    wrapper.style.overflow = "hidden";
    this.rootElement = wrapper;
    this.context = {
      document: document,
      window: window,
      clipContainer: this.rootElement,
      rootElement: wrapper,
      unmount: function unmount() {
        props.host.removeChild(shadow);
      },
      getElements: this.getElements.bind(this),
      getMCID: this.getMCID.bind(this),
      setMCID: this.setMCID.bind(this),
      getElementSelectorByMCID: this.getElementSelectorByMCID.bind(this),
      getElementByMCID: this.getElementByMCID.bind(this)
    };
    this.elementsByMCID = {};
  }

  _createClass(WebComponentMapContextHandler, [{
    key: "getElementByMCID",
    value: function getElementByMCID()
    /*mcid*/
    {
      return [this.context.mapRef];
    }
  }, {
    key: "getElements",
    value: function getElements()
    /*selector*/
    {
      return [this.context.mapRef];
    }
  }, {
    key: "getMCID",
    value: function getMCID()
    /*element*/
    {
      return "mymap";
    }
  }, {
    key: "setMCID",
    value: function setMCID(element
    /*, mcid*/
    ) {
      element.mcid = element.id;
    }
  }, {
    key: "getElementSelectorByMCID",
    value: function getElementSelectorByMCID()
    /*mcid*/
    {
      return this.context.mapRef;
    }
  }]);

  return WebComponentMapContextHandler;
}();

module.exports = WebComponentMapContextHandler;