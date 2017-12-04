const http = require('http');
const p = require('path');
const fs = require('fs');

const port = '2850';
const documentRoot = './';
const res404 = '<h1>404错误</h1><p>你要找的内容不存在</p>';

function startServer(){
    http.createServer(function(req, res){
        let url = req.url;
        let path = documentRoot + url;
        readPath(path, res);
    }).listen(port);
    console.log('服务器启动成功，端口：'+port);
}
function readPath(path, res){
    if(isFolder(path)){
        readFileList(path, res);
    }else{
        readAFile(path, res);
    }
}
function readAFile(path, res){
    fs.readFile(path, 'UTF-8', function(err, data){
        if(err){
            console.log(err);
        }else{
            serverRes(res, 200, data);
        }
    });
}
function readFileList(path, res){
    let filelist = fs.readdirSync(path);
    let list = '';
    filelist.forEach(function(item, index){
        list += '<div><a href="./'+item+'">'+item+'</a></div>';
    });
    serverRes(res, 200, list);
}
function serverRes(res, code = 404, data = res404){
    res.writeHeader(code,{
        'content-type' : 'text/html;charset="utf-8"'
    });
    res.write(data);
    res.end();
}
function isFolder(path){
    return exists(path) && fs.statSync(path).isDirectory();
}
function exists(path){  
    return fs.existsSync(path);  
}
startServer();