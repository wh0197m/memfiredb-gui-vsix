const Webview = require('./common/base')

module.exports =
class TableWebview extends Webview {
  constructor() {
    super({
      filename: 'wechat',
      title: '欢迎进群交流'
    })
  }
}
