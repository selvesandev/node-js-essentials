var http = require('http'),
    fs = require('fs'),//fs or a filesystem module allows us to read write and play with the file
    path = require('path'),//path module help us to construct the path module.
    host = '127.0.0.1',
    port = '9000';


var commonMimes = {
    ".htm": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".html": "text/html"
};

var server = http.createServer(function (req, res) {
    var filePath = req.url === '/' ? './index.html' : '.' + req.url; // if the uri is empty open index.html or request the requested file


    //check if the file exists or not
    fs.exists(filePath, function (fileExists) {
        if (fileExists) {
            //fetch the extension name of a file using the path module and parsing it's mime type by our jsonObject.
            var contentType = commonMimes[path.extname(filePath)];

            fs.readFile(filePath, function (error, content) {
                if (error) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': contentType});
                    res.end(content, 'utf-8');
                }
            });
        } else {
            res.writeHead(404);
            res.end("Sorry we count not find the file you requested");
        }
    })
}).listen(port, host, function () {
    console.log('Dev server started on http://' + host + ':' + port);
});
