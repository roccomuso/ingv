const ingv = require('./')

ingv({
  minMag: 2,
  maxMag: 10
}).then(console.log).catch(console.error)
