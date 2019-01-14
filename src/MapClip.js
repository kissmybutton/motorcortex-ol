const MC = require("@kissmybutton/motorcortex");

// const Helper = MC.Helper;
const helper = new MC.Helper();
const ExtendableClip = MC.ExtendableClip;
// const conf = MC.conf;
const IframeMapContextHandler = require("./IframeMapContextHandler");
// const promise = Promise;

class MapClip extends ExtendableClip {
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

  constructor(attrs = {}, props = {}) {
    props.type = "iframe";
    props.html = `
      <html>
          <head>
            <script async defer src="https://maps.googleapis.com/maps/api/js?key=${
              props.API_KEY
            }&callback=initMap"></script>
            <script>
              var initMap = () => {
                var mymap = new google.maps.Map(document.body, ${JSON.stringify(
                  props.parameters
                )});
                parent.onMapLoad(mymap, google);
              };
            </script>
          </head>
          <body>
          </body></html>
    `;
    super(attrs, props);
    this.props = props;
    this.props.selector = "";
    this.props.css = "";

    const checks = this.runChecks(attrs, props);

    if (!checks) {
      return false;
    }

    let ContextHanlder = null;
    ContextHanlder = IframeMapContextHandler;

    const contextHanlder = new ContextHanlder(props);

    this.ownContext = contextHanlder.context;
    this.isTheClip = true;

    this.attrs = JSON.parse(JSON.stringify(attrs));

    this.ownContext.mapRef = {};
    this.onLoad = global.onMapLoad = this.onLoad.bind(this);
  }

  onLoad(mapRef, google) {
    this.context.google = google;
    this.context.mapRef = mapRef;
    this.props.callback(mapRef);
    global.onMapLoad = undefined;
  }
  onClipInitialise() {
    // console.log(this, window);
  }

  runChecks(attrs, props) {
    if (!helper.isObject(props)) {
      helper.error(`Self Contained Incident expects an object on its \
                second argument on the constructor. ${typeof props} passed`);
      return false;
    }

    if (!props.hasOwnProperty("id")) {
      helper.error(`Self Contained Incident expects the 'id' key on its \
                constructor properties which is missing`);
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

    return true;
  }

  lastWish() {
    this.ownContext.unmount();
  }
}

module.exports = MapClip;
