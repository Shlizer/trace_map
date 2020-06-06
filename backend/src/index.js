var express = require('express')
var app = express()
var Truck = require('./truck')

const { MARKER_NUMBER } = require('./variables')

const truckList = []

for (let i = 0; i < MARKER_NUMBER; ++i) {
  let id = null
  do {
    id = Truck.randomId()
  } while (truckList.hasOwnProperty(id))

  truckList.push(new Truck({ id }))
}

app.get(`/trucks`, function (req, res) {
  res.json(Object.keys(truckList).map(key => truckList[key]))
})

app.listen(4000, function () {
  console.log('App listening on port 4000!')
})
