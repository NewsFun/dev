const http = require('http');
const fs = require('fs');
const port = '2850';

const documentRoot = './';
const server = http.createServer(function(req, res){
    let url = req.url;
    let file = documentRoot + url;
    fs.readFile(file, function(err, data){
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);//将index.html显示在客户端
            res.end();
        }
    });
}).listen(port);
console.log('服务器启动成功，端口：'+port);