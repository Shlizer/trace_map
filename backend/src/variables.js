const MARKER_NUMBER = 1000
const TICK_RATE = { min: 500, max: 2000 } // in miliseconds
const THRESHOLD = { lat: 0.08, lng: 0.04 }
const TRAVEL_CHANCE = 30 // percantage chance

// Values for lat & lng around Poland
// const LAT_LIMIT = { min: 49.24, max: 54.55 }
// const LNG_LIMIT = { min: 14.053, max: 24.5 }

// Values for lat & lng around Tricity
const LAT_LIMIT = { min: 54.289, max: 54.561 }
const LNG_LIMIT = { min: 18.385, max: 18.708 }

module.exports = {
  MARKER_NUMBER,
  TICK_RATE,
  LAT_LIMIT,
  LNG_LIMIT,
  THRESHOLD,
  TRAVEL_CHANCE
}