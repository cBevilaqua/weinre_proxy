const http = require('http');
const httpProxy = require('http-proxy');
const weinre = require('weinre');
const path = require("path");

const childProcess = require('child_process')

// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

var command = path.resolve(__dirname, "node_modules/weinre/weinre") + ' --boundHost 0.0.0.0 --httpPort 8081';

var child = childProcess.exec(command);

child.stdout.on('data', (data) => {
  console.log(`weinre output: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`weinre error: ${data}`);
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
