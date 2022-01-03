# MotorCortex Openlayers

[Openlayers](https://openlayers.org/) library as a MotorCortex Incident

## Installation
```bash
$ npm install @donkeyclip/motorcortex-ol
# OR
$ yarn add @donkeyclip/motorcortex-ol
```

```javascript
import Openlayers from "@donkeyclip/motorcortex-ol";
```


## Key Concepts / Features
MotorCortex Openlayers takes the capabilities of Openlayers library of creating a dynamic map in any web page.
The library exposes a Map Clip with the name Clip which will initialize an Openlayer Map instance where you can add animation with the "GoTo" Incident.


## Documentation
### Import and load the plugin to MotorCortex
```javascript
import MC from "@donkeyclip/motorcortex";
import MapsDef from "@donkeyclip/motorcortex-ol";

const Maps = MC.loadPlugin(MapsDef);

const london = MapsDef.utils.fromLonLat([-0.12755, 51.507222]);
const bern = MapsDef.utils.fromLonLat([7.4458, 46.95]);

const clip = new Maps.Clip(
  {
    parameters: {
      view: { center: london, zoom: 8 }
    }
  },
  {
    host: document.getElementById("clip"),
    containerParams: { width: "1280px", height: "720px" }
  }
);

const gotoBern = new Maps.GoTo(
  {
    animatedAttrs: {
      goto: {
        zoom: 3,
        center: bern
      }
    }
  },
  { duration: 4000, selector: "!#olmap" }
);

clip.addIncident(gotoBern, 0);
clip.play()
```

### Demo
https://donkeyclip.github.io/motorcortex-ol/demo/


## License
[MIT License](https://opensource.org/licenses/MIT)

[<img src="https://presskit.donkeyclip.com/logos/donkey%20clip%20logo.svg" width=250></img>](https://donkeyclip.com)

