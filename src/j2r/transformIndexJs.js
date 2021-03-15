const config = require('./getConfig')()
const { readFile, writeFile } = require('../_util')
const templates = require('./getTemplate')()

const { file, root } = config

const t = JSON.parse(readFile(file))

let { indexJsTemplate } = templates

const { page } = t
const { appRoot } = page

const indexJs = indexJsTemplate.replace(/\(rootNode\)/, `("${appRoot}")`)


writeFile(`${root}/index.js`, indexJs)


