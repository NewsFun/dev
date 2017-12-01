const http = require('http');
const fs = require('fs');
const port = '2850';

const documentRoot = './';
var resp = null;

function startServer(){
    http.createServer(function(req, res){
        let url = req.url;
        let file = documentRoot + url;
        resp = res;
        readFiles(file);    
    }).listen(port);
    console.log('服务器启动成功，端口：'+port);
}
function readFiles(path){
    fs.readFile(file, function(err, data){
        if(err){
            serverRes(404, '<h1>404错误</h1><p>你要找的页面不存在</p>');
        }else{
            serverRes(200, data);
        }
    });
}
function serverRes(code, data){
    resp.writeHeader(code,{
        'content-type' : 'text/html;charset="utf-8"'
    });
    resp.write(data);
    resp.end();
}
startServer();