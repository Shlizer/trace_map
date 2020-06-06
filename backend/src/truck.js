// Values for lat long around Poland
const minLat = 54
const maxLat = 49.17
const minLng = 14
const maxLng = 20.8
const travelChance = 30 // percantage chance
const thresholdLat = 0.08
const thresholdLng = 0.04

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
      const valueLat = thresholdLat * Math.random()
      this.lat = signLat ? this.lat + valueLat : this.lat - valueLat

      const signLng = Math.random() >= 0.5
      const valueLng = thresholdLng * Math.random()
      this.lng = signLng ? this.lng + valueLng : this.lng - valueLng
    }
  }

  static randomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  static randomLat() {
    return minLat + (maxLat - minLat) * Math.random()
  }

  static randomLng() {
    return minLng + (maxLng - minLng) * Math.random()
  }

  static randomTravelChance() {
    return Math.random() < (travelChance / 100)
  }
}

module.exports = Truck