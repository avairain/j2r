const config = require('./getConfig')()
const { readFile, writeFile } = require('../_util')
const templates = require('./getTemplate')()
const { transformJsonList } = require('./transformJson')
const { file, root } = config

const t = JSON.parse(readFile(file))

let { indexTemp } = templates

const { page } = t

const { title, cssLink, body } = page

const s = transformJsonList(body)

indexTemp = indexTemp.replace(/\{page\.title\}/g, title)
indexTemp = indexTemp.replace(/\{page\.cssLink\}/g, cssLink.map(item => `<link rel="stylesheet" href="${item}">`).join('\n\t'))
indexTemp = indexTemp.replace(/<\/body>/, s + '\n</body>')

writeFile(`${root}/index.html`, indexTemp)


