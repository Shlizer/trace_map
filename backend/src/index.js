var express = require('express')
var http = require('http')
var socket = require('ws')
var Truck = require('./truck')
const { MARKER_NUMBER } = require('./variables')

const app = express()
const server = http.createServer(app)
const wss = new socket.Server({ server })

// LAUNCH WS SERVER
wss.on('connection', ws => {
  const truckList = []
  const onTruckMove = truck => ws.send(JSON.stringify([truck]))

  ws.on('message', () => {
    ws.send(JSON.stringify(Object.keys(truckList).map(key => truckList[key])));
  });

  // GENERATE TRUCKS
  for (let i = 0; i < MARKER_NUMBER; ++i) {
    let id = null
    do {
      id = Truck.randomId()
    } while (truckList.hasOwnProperty(id))

    truckList.push(new Truck({ id, onMove: onTruckMove }))
  }
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on port ${server.address().port}`);
});