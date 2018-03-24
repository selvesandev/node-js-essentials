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
//now the function and code that are in the jsFile.js will be available in the REPL.
```