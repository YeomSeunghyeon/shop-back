
const express = require('express')   ;
const app = express()    ;
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(cors({
    origin: '*'  // 모든 도메인의 접근을 허용
}));
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

//사용자 정의 모듈

var userRouter=require('./router/userRouter')

// 세션 모듈, 세션 DB 저장 모듈
var session = require('express-session'); 
var MySqlStore = require('express-mysql-session')(session);
var options = {
    host : 'localhost',
    user : 'root',
    password : 'yhg331228',
    database : 'shop'
    };
var sessionStore = new MySqlStore(options);

app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true,
    store : sessionStore
 }));

// body 파서 모듈 
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// 라우터 호출

app.use('/user',userRouter);

app.use(express.static('public'));

  
app.listen(3001, () => console.log('Example app listening on port 3001'))  