const MARKER_NUMBER = 50
const TICK_RATE = { min: 500, max: 2000 } // in miliseconds

const LAT_LIMIT = { min: 49.17, max: 54 } // Values for lat & lng around Poland
const LNG_LIMIT = { min: 14, max: 20.8 }
const THRESHOLD = { lat: 0.08, lng: 0.04 }
const TRAVEL_CHANCE = 30 // percantage chance

module.exports = {
  MARKER_NUMBER,
  TICK_RATE,
  LAT_LIMIT,
  LNG_LIMIT,
  THRESHOLD,
  TRAVEL_CHANCE
}