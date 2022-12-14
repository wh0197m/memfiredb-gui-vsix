const vscode = require('vscode')

module.exports = new Proxy({
  info: vscode.window.showInformationMessage,
  warn: vscode.window.showWarningMessage,
  error: vscode.window.showErrorMessage,
  fatal: (msg, btns) => vscode.window.showErrorMessage('[BUG] ' + msg, btns)
}, {
  get(target, method) {
    return (msg, btns = []) => target[method]('[MEMFIRE] ' + msg, ...btns)
  }
})