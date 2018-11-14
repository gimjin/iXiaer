const koa = require('koa');
const app = new koa();
const open = require('open')

const static = require('koa-static');
app.use(static(__dirname));

app.listen(3000,function(){
	console.log('http://localhost:3000/');
	open('http://localhost:3000/')
});
