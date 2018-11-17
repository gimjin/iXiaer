const Koa = require('koa')
const koaStatic = require('koa-static')
const path = require('path')
const open = require('open')

const app = new Koa()
app.use(koaStatic(path.resolve(__dirname, './dist')))

app.listen(3000, function () {
  console.log('http://localhost:3000/')
  open('http://localhost:3000/')
})
