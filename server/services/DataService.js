'use strict'
const redis = require('redis')
const {DATA, DATA_KEYS, RANGE_OFFSET, RANGE_START} = require('../constants')
const {DataRecord} = require('../models/DataRecord')
class DataService {
  constructor () {
    this.client = redis.createClient(process.env.REDIS_URL)
  }
  addData ({title, text}) {
    let Record = new DataRecord(title, text)
    return new Promise((resolve, reject) => {
      const client = redis.createClient(process.env.REDIS_URL)
      client.multi()
        .rpush(DATA_KEYS, Record.getUuid())
        .hset(DATA, Record.getUuid(), JSON.stringify(Record))
        .exec((err) => {
          if (err) {
            reject(err)
            client.quit()
            return
          }
          resolve()
          client.quit()
        })
    })
  }
  getData () {
    return new Promise((resolve, reject) => {
      const client = redis.createClient(process.env.REDIS_URL)
      client.lrange(DATA_KEYS, RANGE_OFFSET, RANGE_START, function (err, keys) {
        if (err) {
          reject(err)
          client.quit()
          return
        }
        client.hmget(DATA, keys, function (err, data = []) {
          if (Array.isArray(data) && data.length > 0) {
            resolve(data.map(JSON.parse))
          }
          if (Array.isArray(data)) {
            resolve(data)
          }
          if (err) {
            reject(err)
          }
          client.quit()
        })
      })
    })
  }
}
module.exports = {DataService}
