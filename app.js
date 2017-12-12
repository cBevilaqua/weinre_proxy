var http = require('http');
var httpProxy = require('http-proxy');
var weinre = require('weinre');
var path = require("path");
var absolutePath = path.resolve("node_modules/weinre/weinre");

var execFile = require('child_process').execFile;

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

var child = execFile(absolutePath, ['--boundHost 0.0.0.0', '--httpPort 8081'], function(error, stdout, stderr){
    if (error) {
        console.error('stderr', stderr);
        throw error;
    }
    console.log('stdout', stdout);
});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://127.0.0.1:8081' });
});

console.log("listening on port 8081")
server.listen(8080);