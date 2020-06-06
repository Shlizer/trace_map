// Values for lat long around Poland
const minLat = 54
const maxLat = 53.9
const minLong = 18
const maxLong = 19.6

class Truck {
  constructor(id, lat, long) {
    this.id = id === undefined ? Truck.randomId() : id
    this.lat = lat === undefined ? Truck.randomLat() : lat
    this.long = long === undefined ? Truck.randomLong() : long
  }

  static randomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  static randomLat() {
    return minLat + (maxLat - minLat) * Math.random()
  }

  static randomLong() {
    return minLong + (maxLong - minLong) * Math.random()
  }
}

module.exports = Truck