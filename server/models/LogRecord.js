'use strict'
const uuidv4 = require('uuid/v4')
class LogRecord {
  constructor (eventType = 'log') {
    this.uuid = uuidv4()
    this.date = new Date().getTime()
    this.eventType = eventType
  }
  getUuid () {
    return this.uuid
  }
  getDate () {
    return this.date
  }
  getEventType () {
    return this.eventType
  }
}
module.exports = {LogRecord}
