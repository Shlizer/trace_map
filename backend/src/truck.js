const { LAT_LIMIT, LNG_LIMIT, TRAVEL_CHANCE, THRESHOLD } = require('./variables')

class Truck {
  constructor(id, lat, lng, travelling) {
    this.id = id === undefined ? Truck.randomId() : id
    this.lat = lat === undefined ? Truck.randomLat() : lat
    this.lng = lng === undefined ? Truck.randomLng() : lng
    this.travel = travelling === undefined ? Truck.randomTravelChance() : travelling
  }

  move() {
    if (this.travel) {
      const signLat = Math.random() >= 0.5
      const valueLat = THRESHOLD.lat * Math.random()
      this.lat = signLat ? this.lat + valueLat : this.lat - valueLat

      const signLng = Math.random() >= 0.5
      const valueLng = THRESHOLD.lng * Math.random()
      this.lng = signLng ? this.lng + valueLng : this.lng - valueLng
    }
  }

  static randomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  static randomLat() {
    return LAT_LIMIT.min + (LAT_LIMIT.max - LAT_LIMIT.min) * Math.random()
  }

  static randomLng() {
    return LNG_LIMIT.min + (LNG_LIMIT.max - LNG_LIMIT.min) * Math.random()
  }

  static randomTravelChance() {
    return Math.random() < (TRAVEL_CHANCE / 100)
  }
}

module.exports = Truck