const parse = require('csv-parse')
const fetch = require('node-fetch')
const moment = require('moment')

const PARSER_OPTION = {
  delimiter: '|',
  auto_parse: true,
  columns: true,
  trim: true,
  skip_empty_lines: true
}

const HOST = `http://webservices.ingv.it/fdsnws/event/1/query`
const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss'

function getEvents (opts = {}) {
  return new Promise((resolve, reject) => {
    let parser = parse(PARSER_OPTION, function (err, data) {
      if (err) return reject(err)
      resolve(data.map(cleanProps))
    })

    fetch(composeUrl(opts)).then((res) => {
      res.body.pipe(parser)
    }).catch(reject)
  })
}

function cleanProps (earthquake) {
  earthquake.EventID = earthquake['#EventID']
  delete earthquake['#EventID']
  earthquake.DepthKm = earthquake['Depth/Km']
  delete earthquake['Depth/Km']
  let final = {}
  for (let p in earthquake) {
    final[firstLetterLowerCase(p)] = earthquake[p]
  }
  return final
}

function firstLetterLowerCase (str) {
  return `${str[0].toLowerCase()}${str.slice(1)}`
}

function composeUrl (opts) {
  let {startTime, endTime, minMag, maxMag, minDepth, maxDepth, minLat, maxLat, minLon, maxLon, minVersion, orderBy, format, limit} = opts

  startTime = startTime ? moment(startTime).format(DATE_FORMAT) : moment().subtract(7, 'days').format(DATE_FORMAT)
  endTime = endTime ? moment(endTime).format(DATE_FORMAT) : moment().endOf('day').format(DATE_FORMAT)
  minMag = typeof minMag === 'number' ? minMag : 2
  maxMag = typeof maxMag === 'number' ? maxMag : 10
  minDepth = typeof minDepth === 'number' ? minDepth : -10
  maxDepth = typeof maxDepth === 'number' ? maxDepth : 1000
  minLat = typeof minLat === 'number' ? minLat : -90
  maxLat = typeof maxLat === 'number' ? maxLat : 90
  minLon = typeof minLon === 'number' ? minLon : -180
  maxLon = typeof maxLon === 'number' ? maxLon : 180
  minVersion = typeof minVersion === 'number' ? minVersion : 100

  orderBy = orderBy || 'time-asc'
  format = 'text'
  limit = limit || 10000

  return `${HOST}?starttime=${startTime}&endtime=${endTime}&minmag=${minMag}&maxmag=${maxMag}&mindepth=${minDepth}&maxdepth=${maxDepth}&minlat=${minLat}&maxlat=${maxLat}&minlon=${minLon}&maxlon=${maxLon}&minversion=${minVersion}&orderby=${orderBy}&format=${format}&limit=${limit}`
}

module.exports = getEvents
