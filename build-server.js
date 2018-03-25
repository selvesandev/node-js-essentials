var http = require('http');//http module contains all the available methods used to create server.
var host = '127.0.0.1';
var port = '9000';

var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });//sets the header and status code of the content we are about to serve.

    res.end('<h1>Hello world</h1>');
}).listen(port, host, function () {
    console.log('Dev server started on http://' + host + ':' + port);
});

