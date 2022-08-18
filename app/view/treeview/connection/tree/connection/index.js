const { PgsqlElement } = require('./pgsql')

module.exports = function getConEl(root, options) {
  // MEMFIRE_ADAPTER
  const Klass = {
    postgresql: PgsqlElement
  }[options.client]
  if(!Klass)
    throw Error('未知的连接类型')
  return new Klass(root, options)
}
