var express = require('express')
var app = express()
var Truck = require('./truck')

app.get(`/trucks`, function (req, res) {
  const truckList = {}
  for (let i = 0; i < 4000; ++i) {
    let truck = null

    do {
      truck = new Truck()
    } while (truckList.hasOwnProperty(truck.id))

    truckList[truck.id] = truck
  }
  res.json(truckList)
})

app.listen(4000, function () {
  console.log('App listening on port 4000!')
})
