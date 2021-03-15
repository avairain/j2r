const { readFile } = require('../_util')

const { argv } = process

let cmdConfig = {}

if (argv.length > 2) {
  const arr = argv.filter(v => /^--/.test(v))
  arr.forEach(v => {
    const params = v.split('=')
    const key = params[0].replace(/-/g, '')
    cmdConfig[key] = params[1]
  })
}

let fileConfig = {}

try {
  fileConfig = JSON.parse(readFile(`./${cmdConfig.config}` || './j2r.config.json').toString())
} catch (err) {
  // throwErr(err)
  fileConfig = {}
}

const newConfig = {
  ...fileConfig,
  ...cmdConfig
}

module.exports = () => newConfig
