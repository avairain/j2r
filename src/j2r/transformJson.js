const { throwErr } = require('../_util')
const config = require('./getConfig')()

let usedComponent = []

const transformJson = (option) => {
  if (!(option instanceof Object)) {
    return option
  }
  const { type, props = {}, children } = option
  let propsStr = ''
  Object.keys(props).forEach(v => {
    const s = props[v]
    const reg = /^function:/
    const isFunction = reg.test(s)
    if (isFunction) {
      try {
        // const newProp = new Function(s.replace(reg, ''))
        props[v] = s.replace(reg, '')
        propsStr += `${v}={${props[v]}} `
      } catch (error) {
        console.log('error in', config.file)
        throwErr(error)
      }
    } else {
      if (v === 'style') {
        propsStr += `${v}={${JSON.stringify(props[v])}} `
      } else {
        propsStr += `${v}="${props[v]}" `
      }
    }
  })
  propsStr = propsStr.trim();
  /^[A-Z]/.test(type) && usedComponent.push(type)
  return `<${type}${propsStr ? ` ${propsStr}`: ''}>
  ${transformJsonList(children)}
</${type}>`
}

const transformJsonList = (optionsList) => {
  return optionsList ? optionsList.map(v => transformJson(v)).join('') : ''
}

module.exports = {
  get transformJson() {
    usedComponent = []
    return transformJson
  },
  get transformJsonList () {
    usedComponent = []
    return transformJsonList
  },
  getUsedComponent() {
    return usedComponent
  }
}
