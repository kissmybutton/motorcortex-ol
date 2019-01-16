const MC = require("@kissmybutton/motorcortex");
const { linear } = require("ol/easing.js");

class ZoomTo extends MC.TimedIncident {
  constructor(attrs, props) {
    super(attrs, props);
    this.previousMs = -100;
    this.zoomChanged = true;
    this.onCompleteZoom = this.onCompleteZoom.bind(this);
  }
  getScratchValue(/*mcid, attribute*/) {
    const _goto = {
      zoom: this.context.mapRef.getView().getZoom(),
      center: this.context.mapRef.getView().getCenter()
    };
    return _goto;
  }

  onCompleteZoom() {
    this.zoomChanged = true;
  }
  onCompleteCenter() {
    this.centerChanged = true;
  }
  onProgress(progress, millisecond) {
    for (const key in this.attrs.animatedAttrs) {
      const delta = Math.abs(this.previousMs - millisecond);
      if ((this.zoomChanged && delta > 80) || progress >= 1 || progress <= 0) {
        const view = this.context.mapRef.getView();

        const initialValue = this.getInitialValue(key);
        const initialZoom = initialValue.zoom;
        const attributesZoom = this.attrs.animatedAttrs.goto.zoom;
        const calcZoom = initialZoom - attributesZoom;
        const zoom = initialZoom - calcZoom * progress;

        const initialCenterX = initialValue.center[0];
        const attributesCenterX = this.attrs.animatedAttrs.goto.center[0];
        const calcCenterX = initialCenterX - attributesCenterX;
        const x = initialCenterX - calcCenterX * progress;

        const initialCenterY = initialValue.center[1];
        const attributesCenterY = this.attrs.animatedAttrs.goto.center[1];
        const calcCenterY = initialCenterY - attributesCenterY;
        const y = initialCenterY - calcCenterY * progress;

        view.cancelAnimations();

        view.animate(
          {
            center: [x, y],
            zoom,
            duration: delta,
            easing: linear
          },
          this.onCompleteZoom
        );
        this.zoomChanged = false;
        this.previousMs = millisecond;
      }
    }
  }
}

module.exports = ZoomTo;
