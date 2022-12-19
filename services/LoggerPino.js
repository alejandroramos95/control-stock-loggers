const pino = require('pino')

const loggerError = pino('error.log')
const loggerWarn = pino('warning.log')
const loggerInfo = pino('Info.log')

loggerError.level = 'error'
loggerWarn.level = 'warn'
loggerInfo.level = 'info'

function routeAndMethodsInfo(req) {
  loggerInfo.info(`Petición entrante -----> Ruta: ${req.url}, method: ${req.method}`)
}

function routeNonExistWarn() {
  loggerWarn.warn('Ruta incorrecta')
  loggerInfo.warn('Ruta incorrecta')
}

function errorFound(error) {
  loggerError.error(error)
}

module.exports = { routeAndMethodsInfo, routeNonExistWarn, errorFound }
