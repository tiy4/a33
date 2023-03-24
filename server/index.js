const express = require('express')
const http = require('http')
const con = require('./api/sqlConnectApi')
const { use_database } = require('./api/sqlHandle')
const mysql = require('mysql')
// 解析客户端的请求body中的内容
var bodyParser = require('body-parser')

var app = express()
const server = http.createServer(app);
// 数据库连接对象
var conn = sqlconnect();

server.on('request',function(req,res){})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 创建路由规则
app.get('/getdata',(req, res)=>{
    select_date(conn,res,req);
})

app.post('/insertdata',(req, res)=>{
    console.log(req.body);
    // console.log(res);
})


server.listen(3000,()=>{
    console.log('Server listening at port 3000');
})

