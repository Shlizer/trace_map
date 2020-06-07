var express = require('express')
var app = express()
var Truck = require('./truck')

const { MARKER_NUMBER } = require('./variables')

const truckList = {}
const truckListMoving = {}

for (let i = 0; i < MARKER_NUMBER; ++i) {
  let id = null
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
