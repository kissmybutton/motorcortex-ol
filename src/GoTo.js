import { Effect } from "@donkeyclip/motorcortex";

export default class ZoomTo extends Effect {
  onGetContext() {
    //initialize the animation object
    this.view = this.element.entity.getView();
    this.animation = {
      anchor: this.targetValue.anchor,
      sourceResolution: this.view.getResolutionForZoom(this.initialValue.zoom),
      targetResolution: this.view.getResolutionForZoom(
        this.targetValue.zoom || this.initialValue.zoom
      ),
      sourceCenter: this.initialValue.center,
      targetCenter: this.targetValue.center || this.initialValue.center,
      sourceRotation: this.initialValue.rotation,
      targetRotation: this.targetValue.rotation
        ? this.initialValue.rotation +
          ((this.targetValue.rotation - this.initialValue.rotation + Math.PI) %
            (2 * Math.PI)) -
          Math.PI
        : this.initialValue.rotation,
    };
  }

  getScratchValue() {
    const _goto = {
      zoom: this.element.entity.getView().getZoom(),
      center: this.element.entity.getView().getCenter(),
      rotation: this.element.entity.getView().getRotation(),
    };

    return _goto;
  }

  onProgress(millisecond /*, millisecond*/) {
    //this has better effect than mc easings
    /*
    CHANGE MAP CENTER
    */
    const x0 = this.animation.sourceCenter[0];
    const y0 = this.animation.sourceCenter[1];
    const x1 = this.animation.targetCenter[0];
    const y1 = this.animation.targetCenter[1];
    const x = x0 + this.getFraction(millisecond) * (x1 - x0);
    const y = y0 + this.getFraction(millisecond) * (y1 - y0);

    this.view.setCenter([x, y]);

    /*
    CHANGE MAP RESOLUTION
    */
    const resolution =
      this.getFraction(millisecond) === 1
        ? this.animation.targetResolution
        : this.animation.sourceResolution +
          this.getFraction(millisecond) *
            (this.animation.targetResolution - this.animation.sourceResolution);
    if (this.animation.anchor) {
      this.view.setCenter(
        this.view.calculateCenterZoom(resolution, this.animation.anchor)
      );
    }
    this.view.setResolution(resolution);

    /*
    CHANGE MAP ROTATION
    */
    const rotation =
      this.getFraction(millisecond) === 1
        ? ((this.animation.targetRotation + Math.PI) % (2 * Math.PI)) - Math.PI
        : this.animation.sourceRotation +
          this.getFraction(millisecond) *
            (this.animation.targetRotation - this.animation.sourceRotation);
    if (this.animation.anchor) {
      this.view.setCenter(
        this.view.calculateCenterRotate(rotation, this.animation.anchor)
      );
    }
    this.view.setRotation(rotation);
  }
}
