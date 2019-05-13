'use strict'
const uuidv4 = require('uuid/v4')
class DataRecord {
  constructor (title, text) {
    this.uuid = uuidv4()
    this.date = new Date().getTime()
    this.title = title
    this.text = text
  }
  getUuid () {
    return this.uuid
  }
  getDate () {
    return this.date
  }
  getTitle () {
    return this.title
  }
  getText () {
    return this.text
  }
}
module.exports = {DataRecord}
