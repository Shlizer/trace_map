import { LAT_LIMIT, LNG_LIMIT, TRAVEL_CHANCE, THRESHOLD, TICK_RATE } from './variables'

export default class Truck {
  id: string
  lat: number
  lng: number
  travel: boolean

  constructor(
    { id = Truck.randomId(), lat = Truck.randomLat(), lng = Truck.randomLng(), travel = Truck.randomTravelChance() }
      : { id?: string, lat?: number, lng?: number, travel?: boolean }
  ) {
    this.id = id
    this.lat = lat
    this.lng = lng
    this.travel = travel
    setTimeout(this.move.bind(this), Truck.getTickRate())
  }

  static getTickRate(): number {
    return TICK_RATE.min + (TICK_RATE.max - TICK_RATE.min) * Math.random()
  }

  static randomId() {
    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
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

  move() {
    if (this.travel) {
      const signLat = Math.random() >= 0.5
      const valueLat = THRESHOLD.lat * Math.random()
      this.lat = signLat ? this.lat + valueLat : this.lat - valueLat

      const signLng = Math.random() >= 0.5
      const valueLng = THRESHOLD.lng * Math.random()
      this.lng = signLng ? this.lng + valueLng : this.lng - valueLng
      setTimeout(this.move.bind(this), Truck.getTickRate())
    }
  }
}
