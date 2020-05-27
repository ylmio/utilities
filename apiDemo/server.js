//导入http模块;
var http = require("http");

//创建 http server,并传入回调函数
var server = http.createServer(function(request,response){
    //回调函数接收request和response对象
    //获得HTTP请求的method和url;
    console.log("请求对象是:"+request.toString());
    console.log("响应对象是:"+response);

    // response.writeHead(200,{'Content-Type':'text/html'});

    //将HTTP响应的HTML内容写入response
    response.end("Hello,world!")

});

//让服务器监听8080端口
server.listen(8088);


console.log('Server is running at http://127.0.0.1:8088/');

