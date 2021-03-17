const config = require('./getConfig')()
const { readFile, writeFile } = require('../_util')
const templates = require('./getTemplate')()
const { transformJson, getUsedComponent } = require('./transformJson')

const { file, root } = config

const t = JSON.parse(readFile(file))

let { routerTemplate } = templates

const { route } = t

let routeJs = transformJson(route)

routeJs = routerTemplate.replace(/jsx/, `(
  ${routeJs}
)`)

routeJs = routeJs.replace(/importRoute/, '{ HashRouter, BrowserRouter, Route }')
routeJs = routeJs.replace(/react-router-dom';/, `react-router-dom';
import * as View from './view/index';`)
writeFile(`${root}/Route.js`, routeJs)


