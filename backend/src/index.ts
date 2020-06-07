const express = require('express')
import Truck from './truck'
import { MARKER_NUMBER } from './variables'

const app = express()
const truckList = {}
const truckListMoving = {}

for (let i = 0, id = ''; i < MARKER_NUMBER; ++i) {
  do {
    id = Truck.randomId()
  } while (truckList[id])

  truckList[id] = new Truck({ id })
  if (truckList[id].travel) truckListMoving[id] = truckList[id]
}

app.get(`/trucks`, function (req, res) {
  res.json(truckList)
})

app.get(`/trucksMove`, function (req, res) {
  res.json(truckListMoving)
})

app.listen(4000, function () {
  console.log('App listening on port 4000!')
})
