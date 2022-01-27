# Kind Man 好心人

想做一个简单的有助于人的小工具

虽然感觉很没用哈哈哈 🤣

```js
var script = document.createElement("script")
script.charset = "utf8"
script.src = "http://localhost:5000/kind-man.umd.js"
document.head.appendChild(script)
script.onload = function () {
  KindMan.create()
}
```
