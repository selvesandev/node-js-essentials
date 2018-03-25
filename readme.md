## Node REPL
> Read Evaluate Print Line.

node js allows us to write code directly into an environment that executes it immediately and is
useful when you quickly try out things. The Javascript Console inside chrome developer tool is also a `REPL`.

Open up the terminal
```
node
```
and tap enter.

```
10+10; //in terminal - REPL

new Date();

//Shift + enter to write same block of code in new line.
function a(){
    return 'test';
}

```

Everything that you type in the `REPL` will be saved in the session. To save this session into a file 
you will have to write `.save fileName.js` all the REPL code will be imported as `fileName.js`

```
fs.read('storyBook.txt','utf8',function(err,content){console.log(content);})
```

Same as saving a session we can load a javascript file too.
```
.load jsFile.js
//now the function and code that are in the jsFile.js will be available in the REPL
```

## Build a server
A software that serves to files and data. apache,nginx serves files and data and run various server
executable code.

In Nodejs you will have to build your server.
```
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


```

Run you server by 
```
node build-server.js
```

## Serving a file like nginx or apache
In node js you will have to build you own server to parse you html,image etc file to the browser

**Here's a sample code**
```
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

```


## Solving the Problem of `fs.readFile()`

this function buffers up every file to the memory before serving them out.
The files are read into the buffer and only when the file is read completely it is flushed out 
to the response object.
**This slow down things and consumes the server resources badly**

#### Streams are here to solve this issue.
These are like pipelines to your app which can control and allow data to flow through your app whithout
holding it in buffer.
So Instead of waiting for files to buffer files are streamed out to the user as it is being read.
This cut's down the server and makes the serving very very efficiency.

We will modify the `file serving code above` and make it able to stream.


