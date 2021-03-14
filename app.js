const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();

//템플릿에진 ejs로 설정 및 view 디렉토리 설정
app.set('views', __dirname + '/views/'); 
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//스태틱폴더 설정
app.use(express.static(__dirname+'/public')); 
//바디파서 연결
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//서버 실행
let server = app.listen(3000, ()=>{
    console.log("Express server has started on port 3000");
})

//라우터 연결 부분
const router = require('./router/route');
app.use('/', router);
