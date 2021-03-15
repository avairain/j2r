const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const config = require('../src/j2r/getConfig')()
const util = require('../src/_util')

const compile = () => {
  const { argv } = process
  const arr = argv.filter(v => /^--/.test(v))

  console.log('开始构建')
  child_process.exec(`node ${util.resolve('src/index.js')} ${arr.join(' ')}`, {}, (err, message) => {
    if (err) {
      if (message) {
        console.log(message)
      }
      util.throwErr(err)
    }
    console.log('构建完成')
  })
}

module.exports = {
  start: () => {
    fs.watchFile(path.join(config.file), () => {
      console.log('文件: ', config.file, ' 修改,', '开始构建')
      compile()
    })
    compile()
  },
  build: () => {
    compile()
  }
}