const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const prettier = require("prettier");
const resolve = (pathString = '') => {
  return path.join(__dirname, '../', pathString)
}

const throwErr = (e) => {
  throw new Error(e)
}

const readFile = (path) => {
  return fs.readFileSync(path).toString()
}

const writeFile = async (pa, file) => {
  const p = pa
  let f = typeof file === 'string' ? file : JSON.stringify(file)
  await mkdirp(path.dirname(p))
  if (/\.js/.test(pa)) {
    f = prettier.format(f)
  }
  const t = readFile(p)
  if (t !== f) {
    console.log('writeFile', p)
    fs.writeFile(p, f, e => {
      console.log('writed')
    })
  }
}

module.exports = {
  resolve,
  throwErr,
  readFile,
  writeFile
}
