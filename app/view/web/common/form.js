const Webview = require('./base')
const { NilField, FieldWrongDetail } = require('../../../../lib/type')
const noty = require('../../../../lib/vscode-utils/noty')

module.exports = class FormWebview extends Webview {
  constructor(options) {
    options.webviewServerHandlers = Object.assign({
      save: data => this.save(data)
    }, options.webviewServerHandlers)
    super(options)
  }

  upsert() {
    throw Error('FormWebview.prototype.upsert unimplemented')
  }

  async save(data) {
    try {
      await this.upsert(data)
      noty.info('已保存')
      return true
    } catch(err) {
      if(err instanceof FieldWrongDetail) {
        noty.error('保存失败：' + err.name + (
          err.type === NilField
          ? ' 未填写'
          : ' 格式错误'
        ))
      } else
        this.handleErr(err)
      return false
    }
  }
}
