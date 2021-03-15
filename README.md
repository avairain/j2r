# 开始


## 安装
```shell
npm i @avairain/j2r
```
## 配置文件

j2r.config.json

```js

{
  "file": "input.json", // 入口
  "template": "./template/index.html", // 模板回填 page.title page.cssLink
  "root": "./dist" // 导出
}

```

## 构建
```shell
j2rbuild
```

## 监听入口文件
```shell
j2r
```

## 修改配置文件
```shell
j2r --config=your.config.json --root=dist
```

## input.json

```js
{
  "route": {
    "type": "BrowserRouter", // react-router-dom HashRouter BrowserRouter,
    "children": [ // 子节点（路由）
      {
        "type": "Route",
        "props": {
          "path": "/" // 路由
        },
        "children": [
          {
            "type": "View.B" // view.B 组件
          }
        ]
      }
    ]
  },
  "view": {
    "B": {
      "type": "div",
      "usingHooks": [ // 使用的hooks
        {
          "name": "useState, useEffect",
          "package": "react"
        },
        {
          "name": "useBoolean",
          "package": "ahooks"
        },
        {
          "name": "useLocale",
          "package": "../../hooks"
        }
      ],
      "props": {
        "onClick": "function: (e) => console.log(e)",
        "style": {
          "color": "red"
        }
      },
      "children": ["c", "{props.children}"] // <div onClick={(e) => console.log(e)}>{props.children}</div>
    }
  },
   "page": {
    "title": "页面标题",
    "cssLink": ["css链接"],
    "appRoot": "根节点",
    "body": [
      {
        "type": "元素类型",
        "props": { // 元素属性
          "id": "root"
        }
      }
    ]
  }
}
```