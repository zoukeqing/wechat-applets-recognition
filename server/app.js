const path = require('path');
// HTTP 模块同时支持 Express 和 WebSocket
const http = require('http');
// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
// 引用 wafer-session 支持小程序会话
const waferSession = require('wafer-node-session');
// 使用 MongoDB 作为会话的存储
const MongoStore = require('connect-mongo')(waferSession);
// 引入配置文件
const config = require('./config');
// 引入 WebSocket 服务实现
const websocket = require('./websocket');

// 创建一个 express 实例
const app = express();

// 独立出会话中间件给 express 和 ws 使用
const sessionMiddleware = waferSession({
    appId: config.appId,
    appSecret: config.appSecret,
    loginPath: '/login',
    store: new MongoStore({
        url: `mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoHost}:${config.mongoPort}/${config.mongoDb}`
    })
});
app.use(sessionMiddleware);

// 在路由 /me 下，输出会话里包含的用户信息
app.use('/me', (request, response, next) => {
    response.json(request.session ? request.session.userInfo : { noBody: true });
    if (request.session) {
        console.log(`Wafer session success with openId=${request.session.userInfo.openId}`);
    }
});

// 请求背景图
app.use('/background-image',require('./routes/background-image'))

app.use('/characters', require('./routes/characters'));

app.use('/plant', require('./routes/plant'));

app.use('/animal', require('./routes/animal'));

app.use('/car', require('./routes/car'));

app.use('/dishes', require('./routes/dishes'));

app.use('/logo-search', require('./routes/logo-search'));

app.use((request, response, next) => {
	response.writeHead(200, {'Content-Type': 'text/html'});  
	response.write('<head><meta charset="utf-8"/></head>');  
	response.write('<h1 style="text-align: center;margin-top: 200px;">微信小程序之《取字识物》</h1>');
	response.end();
});

// 创建 HTTP Server 而不是直接使用 express 监听
const server = http.createServer(app);

// 让 WebSocket 服务在创建的 HTTP 服务器上监听
websocket.listen(server, sessionMiddleware);

// 启动 HTTP 服务
server.listen(config.serverPort);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${config.serverPort}`);
