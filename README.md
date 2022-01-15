# MotorCortex-Openlayers

**Table of Contents**

- [MotorMortex-Openlayers](#motorcortex-openlayers)
  - [Demo](#demo)
- [Intro / Features](#intro--features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Importing and Loading](#importing-and-loading)
- [Creating Incidents](#creating-incidents)
  - [Map Clip](#map-clip)
  - [GoTo](#goto)
- [Adding Incidents in your clip](#adding-incidents-in-your-clip)
- [Contributing](#contributing)
- [License](#license)
- [Sponsored by](#sponsored-by)

## Demo

[Check it out here](https://donkeyclip.github.io/motorcortex-ol/demo/)

# Intro / Features
MotorCortex Openlayers takes the capabilities of [Openlayers](https://openlayers.org/) library of creating a dynamic map in any web page.
The library exposes a Map Clip with the name Clip which will initialize an Openlayer Map instance where you can add animation with the "GoTo" Incident.

This Plugin exposes two Incident:
- Map Clip
- GoTo

# Getting Started

## Installation
```bash
$ npm install @donkeyclip/motorcortex-ol
# OR
$ yarn add @donkeyclip/motorcortex-ol
```
## Importing and loading

```javascript
import { loadPlugin } from "@donkeyclip/motorcortex";
import MapsDef from "@donkeyclip/motorcortex-ol";
const Maps = loadPlugin(MapsDef);
```

# Creating Incidents

## Map Clip
```javascript
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
```
### Map Clip Attrs
Map Clip take as a parameter a `view` object. This object contains the starting point (`center`) and the `zoom` number.
The `center` value has the following structure: 
```javascript
center: MapsDef.utils.fromLonLat([-0.12755, 51.507222])
```

## GoTo
```javascript
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
```
### GoTo Attrs 
Goto Incident take as an attribute a `goto` object.This object contains the ending point (`center`) and the `zoom` number.

#### IMPORTANT
Along with the attributes, all `GoTo incidents` must take on their props the `selector` key with the value: `!#olmap`

# Adding Incidents in your clip

```javascript
mapsClipName.addIncident(incidentGoToName,startTime);
```

# Contributing 

In general, we follow the "fork-and-pull" Git workflow, so if you want to submit patches and additions you should follow the next steps:
1.	**Fork** the repo on GitHub
2.	**Clone** the project to your own machine
3.	**Commit** changes to your own branch
4.	**Push** your work back up to your fork
5.	Submit a **Pull request** so that we can review your changes

# License

[MIT License](https://opensource.org/licenses/MIT)

# Sponsored by
[<img src="https://presskit.donkeyclip.com/logos/donkey%20clip%20logo.svg" width=250></img>](https://donkeyclip.com)
