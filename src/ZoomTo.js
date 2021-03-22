import MC from "@kissmybutton/motorcortex";
import { inAndOut } from "ol/easing.js";

export default class ZoomTo extends MC.Effect {
  onGetContext() {
    //initialize the animation object

    this.view = this.element.entity.getView();
    const resolution = this.view.getResolutionForZoom(this.initialValue.zoom);

    this.animation = {
      anchor: this.targetValue.anchor,
      easing: inAndOut
    };

    if (this.targetValue.center) {
      this.animation.sourceCenter = this.initialValue.center;
      this.animation.targetCenter = this.targetValue.center;
    }

    if (this.targetValue.zoom !== undefined) {
      this.animation.sourceResolution = resolution;
      this.animation.targetResolution = this.view.constrainResolution(
        this.view.maxResolution_,
        this.targetValue.zoom - this.view.minZoom_,
        0
      );
    } else if (resolution) {
      this.animation.sourceResolution = resolution;
      this.animation.targetResolution = resolution;
    }

    //to do: in case we implement rotation
    if (this.targetValue.rotation !== undefined) {
      this.animation.sourceRotation = this.initialValue.rotation;
      const delta =
        ((this.targetValue.rotation - this.initialValue.rotation + Math.PI) %
          (2 * Math.PI)) -
        Math.PI;
      this.animation.targetRotation = this.initialValue.rotation + delta;
    }
  }

  getScratchValue() {
    const _goto = {
      zoom: this.element.entity.getView().getZoom(),
      center: this.element.entity.getView().getCenter(),
      rotation: this.element.entity.getView().getRotation()
    };

    return _goto;
  }

  animate(progress) {
    progress = this.animation.easing(progress);
    if (this.animation.sourceCenter) {
      const x0 = this.animation.sourceCenter[0];
      const y0 = this.animation.sourceCenter[1];
      const x1 = this.animation.targetCenter[0];
      const y1 = this.animation.targetCenter[1];
      const x = x0 + progress * (x1 - x0);
      const y = y0 + progress * (y1 - y0);
      this.view.setCenter([x, y]);
    }

    if (this.animation.sourceResolution && this.animation.targetResolution) {
      const resolution =
        progress === 1
          ? this.animation.targetResolution
          : this.animation.sourceResolution +
            progress *
              (this.animation.targetResolution -
                this.animation.sourceResolution);
      if (this.animation.anchor) {
        this.view.setCenter(
          this.view.calculateCenterZoom(resolution, this.animation.anchor)
        );
      }
      this.view.setResolution(resolution);
    }

    //to do: in case we implement rotation
    if (
      this.animation.sourceRotation !== undefined &&
      this.animation.targetRotation !== undefined
    ) {
      const rotation =
        progress === 1
          ? ((this.animation.targetRotation + Math.PI) % (2 * Math.PI)) -
            Math.PI
          : this.animation.sourceRotation +
            progress *
              (this.animation.targetRotation - this.animation.sourceRotation);
      if (this.animation.anchor) {
        this.view.setCenter(
          this.view.calculateCenterRotate(rotation, this.animation.anchor)
        );
      }
      this.view.setRotation(rotation);
    }
  }

  onProgress(progress /*, millisecond*/) {
    this.animate(progress);
  }
}
