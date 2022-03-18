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
    const view = this.element.entity.getView();
    return {
      zoom: view.getZoom(),
      center: view.getCenter(),
      rotation: view.getRotation(),
    };
  }

  onProgress(millisecond) {
    const fraction = this.getFraction(millisecond);
    //this has better effect than mc easings
    /*
    CHANGE MAP CENTER
    */
    const animation = this.animation;
    const x0 = animation.sourceCenter[0];
    const y0 = animation.sourceCenter[1];
    const x1 = animation.targetCenter[0];
    const y1 = animation.targetCenter[1];
    const x = x0 + fraction * (x1 - x0);
    const y = y0 + fraction * (y1 - y0);

    this.view.setCenter([x, y]);

    /*
    CHANGE MAP RESOLUTION
    */
    const resolution =
      fraction === 1
        ? animation.targetResolution
        : animation.sourceResolution +
          fraction * (animation.targetResolution - animation.sourceResolution);
    if (animation.anchor) {
      this.view.setCenter(
        this.view.calculateCenterZoom(resolution, animation.anchor)
      );
    }
    this.view.setResolution(resolution);

    /*
    CHANGE MAP ROTATION
    */
    const rotation =
      fraction === 1
        ? ((animation.targetRotation + Math.PI) % (2 * Math.PI)) - Math.PI
        : animation.sourceRotation +
          fraction * (animation.targetRotation - animation.sourceRotation);
    if (animation.anchor) {
      this.view.setCenter(
        this.view.calculateCenterRotate(rotation, animation.anchor)
      );
    }
    this.view.setRotation(rotation);
  }
}
