const MC = require("@kissmybutton/motorcortex");

class GMap extends MC.Group {
  onGetContext() {
    const host = this.channel.context.rootElement.querySelectorAll(
      this.attrs.host
    )[0];

    // console.log(this.channel, this.attrs.host);
    const html = `
          <html>
          <head></head>
          <body>
          <script async defer src="https://maps.googleapis.com/maps/api/js?key=${
            this.props.API_KEY
          }&callback=initMap"></script>
            <script>
              var initMap = () => {
                console.log("Asdfsadf")
                var mymap = new google.maps.Map(document.body, ${JSON.stringify(
                  this.props.parameters
                )});
                parent.onMapLoad(mymap,"${this.id}")
              };
            </script>
          </body></html>`;
    const css = "";
    const containerParams = { width: "100%", height: "100%" };

    const mapClip = new MC.Clip(null, {
      css,
      html,
      host,
      containerParams,
      type: "iframe"
    });

    this.addPassiveIncident(mapClip, 0);

    global.onMapLoad = mapRef => {
      this.props.callback(mapRef);
    };
  }
}
module.exports = GMap;
