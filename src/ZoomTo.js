const MC = require("@kissmybutton/motorcortex");

class ZoomTo extends MC.TimedIncident {
  constructor(attrs, props) {
    super(attrs, props);
    this.previousMillisecondZoom = 0;
    this.previousMillisecondCenter = 0;
    this.zoomChanged = true;
    this.centerChanged = true;
  }
  onGetContext() {
    this.context.mapRef.addListener("zoom_changed", () => {
      this.zoomChanged = true; // be prepared for the user zoom action
    });
    this.context.mapRef.addListener("center_changed", () => {
      this.centerChanged = true; // be prepared for the user zoom action
    });
  }
  getScratchValue(mcid, attribute) {
    if (attribute == "center") {
      return {
        lat: this.context.mapRef.center.lat(),
        lng: this.context.mapRef.center.lng()
      };
    }
    return this.context.mapRef[attribute];
  }

  onProgress(progress /*, millisecond*/) {
    for (const key in this.attrs.animatedAttrs) {
      const initialValue = this.getInitialValue(key);
      if (key === "zoom") {
        const zoom = Math.round(
          initialValue -
            (initialValue - this.attrs.animatedAttrs.zoom) * progress
        );

        if (
          zoom != this.context.mapRef.zoom &&
          this.centerChanged &&
          this.zoomChanged
        ) {
          this.zoomChanged = false;
          this.context.mapRef.setZoom(zoom);
        }
      }
      if (key === "center" && this.centerChanged && this.zoomChanged) {
        this.centerChanged = false;
        const calcLat =
          initialValue.lat -
          (initialValue.lat - this.attrs.animatedAttrs.center.lat) * progress;
        const calcLng =
          initialValue.lng -
          (initialValue.lng - this.attrs.animatedAttrs.center.lng) * progress;
        this.context.mapRef.setCenter(
          new this.context.google.maps.LatLng(calcLat, calcLng)
        );
      }
    }
  }
}

module.exports = ZoomTo;
