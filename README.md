# ingv

[![NPM Version](https://img.shields.io/npm/v/ingv.svg)](https://www.npmjs.com/package/ingv)
![node](https://img.shields.io/node/v/ingv.svg)
[![Dependency Status](https://david-dm.org/roccomuso/ingv.png)](https://david-dm.org/roccomuso/ingv)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Get INGV Earthquake events in Node.js

Node API client to get **[INGV](http://terremoti.ingv.it/it/)** [earthquake events](http://cnt.rm.ingv.it/en/events).

## Install

`npm install --save ingv`

## Example

```javascript
const ingv = require('ingv')

let options = {
  startTime: null /* Date obj */,
  endTime: null /* Date obj */,
  minMag: 2 /* 0-10 */,
  maxMag: 10 /* 0-10 */,
  minDepth: -10 /* negative/positive number (Km) */,
  maxDepth: 1000 /* negative/positive number  (Km) */,
  minLat: -90 /* from -90 to 90 */,
  maxLat: 90 /* from -90 to 90 */,
  minLon: -180 /* from -180 to 180 */,
  maxLon: 180 /* from -180 to 180 */,
  limit: 10000 /* number */
}

ingv(options).then((data) => {
  /* // Example result:
[
  {
    time: '2018-05-05T07:47:25.490000',
    latitude: 43.0368,
    longitude: 13.0522,
    author: 'SURVEY-INGV',
    catalog: '',
    contributor: '',
    contributorID: '',
    magType: 'ML',
    magnitude: 2.1,
    magAuthor: '--',
    eventLocationName: '1 km S Pieve Torina (MC)',
    eventID: 19187041,
    depthKm: 7.7 
  },
  {
    time: '2018-05-05T13:58:55.630000',
    latitude: 43.0342,
    longitude: 13.0418,
    author: 'SURVEY-INGV',
    catalog: '',
    contributor: '',
    contributorID: '',
    magType: 'ML',
    magnitude: 2.2,
    magAuthor: '--',
    eventLocationName: '1 km SW Pieve Torina (MC)',
    eventID: 19192021,
    depthKm: 8.8
  },
...
]
  */
}).catch(console.error)
```

## License

MIT

## Author

Rocco Musolino [@roccomuso](https://twitter.com/roccomuso)
