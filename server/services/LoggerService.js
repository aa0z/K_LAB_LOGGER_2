'use strict'
const redis = require('redis')
const {LOGS, LOGS_KEYS, RANGE_OFFSET, RANGE_START} = require('../constants')
const {LogRecord} = require('../models/LogRecord')
class LoggerService {
  constructor () {
    this.client = redis.createClient(process.env.REDIS_URL)
  }
  log (eventType) {
    return new Promise((resolve, reject) => {
      let Record = new LogRecord(eventType)
      this.client.multi()
        .rpush(LOGS_KEYS, Record.getUuid())
        .hset(LOGS, Record.getUuid(), JSON.stringify(Record))
        .exec((err) => {
          if (err) {
            reject(err)
            this.client.quit()
            return
          }
          resolve()
          this.client.quit()
        })
    })
  }
  getLogs () {
    return new Promise((resolve, reject) => {
      const client = redis.createClient(process.env.REDIS_URL)
      client.lrange(LOGS_KEYS, RANGE_OFFSET, RANGE_START, function (err, keys) {
        if (err) {
          reject(err)
          client.quit()
          return
        }
        client.hmget(LOGS, keys, function (err, data = []) {
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
module.exports = {LoggerService}
