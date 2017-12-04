const http = require('http');
const fs = require('fs');
const cp = require('child_process');

const port = '2850';
const documentRoot = './';
const res404 = '<h1>404错误</h1><p>你要找的内容不存在</p>';

function readPath(path, res){
    fs.stat(path, (err, stat)=>{
        let isdir = isFolder(stat);
        if(isdir){
            readFileList(path, res);
        }else{
            readAFile(path, res);
        }
    });
}
function isFolder(stat){
    return stat.isDirectory();
}
function fileError(){
    console.log('文件不存在，请确认路径正确！');
}
function readFileList(path, res){
    let filelist = fs.readdirSync(path);
    let list = '';
    filelist.forEach(function(item, index){
        list += '<div><a href="./'+item+'">'+item+'</a></div>';
    });
    serverRes(res, 200, list);
}
function startServer(){
    http.createServer(function(req, res){
        let url = req.url;
        let path = documentRoot + url;
        readPath(path, res);
    }).listen(port);
    console.log('服务器启动成功，端口：'+port);
}
function readAFile(path, res){
    fs.readFile(path, 'UTF-8', function(err, data){
        if(err){
            console.log('读取文件错误，请确认地址有效');
        }else{
            serverRes(res, 200, data);
        }
    });
}
function serverRes(res, code = 404, data = res404){
    res.writeHeader(code,{
        'content-type' : 'text/html;charset="utf-8"'
    });
    res.write(data);
    res.end();
}
startServer();