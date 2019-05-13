'use strict'
const express = require('express')
const redis = require('redis')
const cors = require('cors')
const bodyParser = require('body-parser')
const {LoggerService} = require('./services/LoggerService')
const {DataService} = require('./services/DataService')
const {PORT, DATA_KEYS, EVENT_LOGIN, EVENT_DATA_ADDED} = require('./constants')
const client = redis.createClient(process.env.REDIS_URL)
const app = express()
app.use(cors())
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
client.on('error', function (err) {
  console.log(`Err ${err}`)
})
client.monitor()
client.on('monitor', function (time, args) {
  if (args[0] === 'rpush' && args[1] === DATA_KEYS) {
    const logger = new LoggerService()
    logger.log(EVENT_DATA_ADDED)
  }
})
const jsonParser = bodyParser.json()
app.get('/', (req, res) => {
  const data = new DataService()
  data.getData().then((data) => {
    res.status(200).send(data)
  }).catch((err) => {
    res.status(500).send(JSON.stringify(err))
  })
})
app.get('/logs', (req, res) => {
  const logger = new LoggerService()
  logger.getLogs().then((logs) => {
    res.status(200).send(logs)
  }).catch((err) => {
    res.status(500).send(JSON.stringify(err))
  })
})
app.get('/login', (req, res) => {
  const logger = new LoggerService()
  logger.log(EVENT_LOGIN)
  res.status(200).send({isLoggedIn: true})
})
app.post('/addData', jsonParser, (req, res) => {
  const data = new DataService()
  data.addData(req.body).then(() => {
    res.status(200).send({isDataAdded: true})
  }).catch((err) => {
    res.status(500).send(JSON.stringify(err))
  })
})
