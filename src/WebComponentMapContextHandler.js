const MC = require("@kissmybutton/motorcortex");
const helper = new MC.Helper();

class WebComponentMapContextHandler {
  constructor(props = {}) {
    if (!helper.isObject(props)) {
      helper.error(
        `ContextHandler expects an object on its constructor. ${typeof props} passed`
      );
      return false;
    }

    if (!props.hasOwnProperty("html")) {
      helper.error(
        `ContextHandler expects the html key on its constructor properties which is missing`
      );
      return false;
    }

    if (!props.hasOwnProperty("css")) {
      helper.error(
        `ContextHandler expects the css key on its constructor properties which is missing`
      );
      return false;
    }

    if (!props.hasOwnProperty("initParams")) {
      helper.info(`ContextHandler got null initParams`);
      props.initParams = {};
    }

    if (!props.hasOwnProperty("host")) {
      helper.error(
        `ContextHandler expects the host key on its constructor properties which is missing`
      );
      return false;
    }

    this.isDOM = true;

    const shadow = props.host.attachShadow({ mode: "closed" });
    const wrapper = document.createElement("div");
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

    const styleTag = document.createElement("style");
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
      for (let i = 0; i < props.fonts.length; i++) {
        const theFont = props.fonts[i];
        if (theFont.type === "google-font") {
          const fontTag = document.createElement("link");
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
      unmount: function() {
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

  getElementByMCID(/*mcid*/) {
    return [this.context.mapRef];
  }
  getElements(/*selector*/) {
    return [this.context.mapRef];
  }

  getMCID(/*element*/) {
    return "mymap";
  }

  setMCID(element /*, mcid*/) {
    element.mcid = element.id;
  }

  getElementSelectorByMCID(/*mcid*/) {
    return this.context.mapRef;
  }
}

module.exports = WebComponentMapContextHandler;
