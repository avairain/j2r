const { readFile } = require('../_util')
const config = require('./getConfig')()

const { template } = config

let indexTemp = template ? readFile(template) : `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{page.title}</title>
  {page.cssLink}
</head>
<body>
  
</body>
</html>
`

const reactTemplate = `import React from 'react';`

const reactDomTemplate = `import ReactDOM from 'react-dom';`

const routerTemplate = `import importRoute from 'react-router-dom';

export default (props) => {
  // componentAction
  return jsx
}
`

const componentTemplate = `${reactTemplate}

export default (props) => {
  // componentAction
  return jsx
}
`

const indexJsTemplate = `${reactTemplate}
${reactDomTemplate}
import Route from './Route'

ReactDOM.render(<Route />, document.querySelector(rootNode))
`

module.exports = () => ({
  indexTemp,
  reactTemplate,
  reactDomTemplate,
  routerTemplate,
  indexJsTemplate,
  componentTemplate
})
