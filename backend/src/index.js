var express = require('express')
var app = express()
var Truck = require('./truck')

const truckList = []

for (let i = 0; i < 20; ++i) {
  let truck = null
  do {
    truck = new Truck()
  } while (truckList.hasOwnProperty(truck.id))
  truckList.push(truck)
}

const moveTrucks = () => {
  truckList.forEach(truck => truck.move())
  setTimeout(moveTrucks, 800)
}

setTimeout(moveTrucks, 800)

app.get(`/trucks`, function (req, res) {
  res.json(Object.keys(truckList).map(key => truckList[key]))
})

app.listen(4000, function () {
  console.log('App listening on port 4000!')
})