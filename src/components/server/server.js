const http = require('http');
const fs = require('fs');
const port = '2850';
const documentRoot = './';

function readPath(path){
    var files = fs.existsSync(path);
    if(!files){
        console.log('文件不存在，请确认路径正确！');
        return;
    }
    fs.stat(path, function(err, stat){
        if(err){
            console.log(err);
            return;
        }
        if(stat.isDirectory()){
            console.log(path+':是文件夹');
        }else{
            console.log(path+':是文件');
        }
    });
}
function startServer(){
    http.createServer(function(req, res){
        let url = req.url;
        let path = documentRoot + url;
        readFiles(res, path);    
    }).listen(port);
    console.log('服务器启动成功，端口：'+port);
}
function readFiles(res, path){
    fs.readFile(path, function(err, data){
        if(err){
            serverRes(res, 404, '<h1>404错误</h1><p>你要找的页面不存在</p>');
        }else{
            serverRes(res, 200, data);
        }
    });
}
function serverRes(res, code, data){
    res.writeHeader(code,{
        'content-type' : 'text/html;charset="utf-8"'
    });
    res.write(data);
    res.end();
}
readPath(documentRoot);
startServer();