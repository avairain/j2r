const config = require('./getConfig')()
const { readFile, writeFile } = require('../_util')
const transformTool = require('./transformJson')
const { componentTemplate } = require('./getTemplate')()
const { file, root } = config

const t = JSON.parse(readFile(file))

const { view } = t
let str = ''

const views = Object.keys(view)

views.forEach(v => {
  str += `import ${v} from './${v}/index' \n`
})

str += `

export default {
  ${views.join(',\n')}
}
`

views.forEach(v => {
  const { transformJson, getUsedComponent} = transformTool
  const json = view[v]
  const t = transformJson(json)
  const { componentAction = [], usingHooks = [] } = json
  let hasUseCom = getUsedComponent().map(v => v.split('.')[0])
  hasUseCom = Array.from(new Set(hasUseCom))
  let componentStr = componentTemplate.replace(/jsx/, `(${t})`)
  componentStr = componentStr.replace(/'react';/, `'react';
${hasUseCom.map(v => `import ${v} from '${
  v === 'View'
  ? '../' 
  : /[A-Z]/.test(v) 
    ? v.replace(/([A-Z])/g, '-$1').slice(1).toLocaleLowerCase()
    : v
  }';\n`).join('')}`)
  componentStr = componentStr.replace('// componentAction', componentAction.join('\n'))
  usingHooks.forEach(({name, package}) => {
    const reg = new RegExp(package)
    if(reg.test(componentStr)) {
      const packageReg = new RegExp(`(\\w.)\\sfrom\\s['|"]${package}['|"]`)
      componentStr = componentStr.replace(packageReg, `$1, {${name}} from '${package}'`)
    } else {
      componentStr = componentStr.replace('export default', `import {${name}} from '${package}';

export default`)
    }
  })
  writeFile(`${root}/view/${v}/index.js`, componentStr)
})


writeFile(`${root}/view/index.js`, str)


