import MotorCortex from "@kissmybutton/motorcortex";
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export default class olMap extends MotorCortex.BrowserClip {
  onAfterRender() {
    const olMap = new Map({
      target: this.context.rootElement,
      layers: [
        new Tile({
          preload: 4,
          source: new OSM()
        })
      ],
      loadTilesWhileAnimating: true,
      view: new View(this.attrs.parameters.view)
    });
    this.setCustomEntity("olmap", olMap, ["maps"]);
  }
}
