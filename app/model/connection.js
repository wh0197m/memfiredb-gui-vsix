const ArrayCollection = require('./collection/array')

class ConnectionCollection extends ArrayCollection {
  constructor() {
    super('connection')
  }

  async upsert(record) {
    // MEMFIRE_ADAPTER
    if(record.port)
      record.port = parseInt(record.port) || record.port
    return super.upsert(record)
  }

  validateOne(record) {
  }
}

module.exports = new ConnectionCollection()
