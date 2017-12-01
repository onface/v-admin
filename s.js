var express = require('express')
var serve   = require('express-static')
var app = express()
var open = require("open")
app.use(serve(__dirname))
var port = 8269
var url = "http://127.0.0.1:" + String(port)
app.listen(port, function () {
    console.log('open ' + url)
    open(url)
})
