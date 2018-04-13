var http = require('http');
var httpProxy = require('http-proxy');
var weinre = require('weinre');
var path = require("path");
var absolutePath = path.resolve(__dirname + "/node_modules/weinre/weinre");
var childProcess = require('child_process')
var execFile = childProcess.execFile;

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});


var child = execFile(absolutePath, ['--boundHost 0.0.0.0', '--httpPort 8081'], function(error, stdout, stderr){
    if (error) {
    	console.log("error ", error);
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

var port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log("Server listening on " + port);
});
