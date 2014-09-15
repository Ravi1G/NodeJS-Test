
var http = require('http');

var fs = require('fs');
var director = require('director');
var path = require('path');
var url = require('url');

//extension mapping
extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".png" : "image/png",  
};

//helper function for reding file and wring to responce
function getFile(filePath,res,mimeType){
   
            fs.readFile(filePath,function(err,contents){
                if(!err){
                   
                    res.writeHead(200,{
                        "Content-type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        
}



// handles /login request
function loginHandle()
{
    var
    fileName =  __dirname +"/HTML/login.html";
    getFile(fileName,this.res,extensions['.html']);
}
// handles /register request
function registerHandle() {
     var
    fileName =  __dirname +"/HTML/Signup.html";
    getFile(fileName,this.res,extensions['.html']);
}



var router = new director.http.Router();



    var server = http.createServer(function (req, res) {
        
        
            var p = url.parse(req.url).pathname;
            if (path.dirname(p)==="/Images" || path.dirname(p)==="/css") {
                // Images css and other resources handling
                var
                fileName = path.basename(req.url),
                ext = path.extname(fileName);
                fileName =  __dirname +p;
                getFile(fileName,res,extensions[ext]);
                
            }else{
              //Got request ? give it to router for dispatch
        
        
        
                    router.dispatch(req, res, function (err) {
                        if (err) {
                          res.writeHead(404);
                          res.write("Page not Fount");
                          res.end();
                        }
                    });
        
                 }
        
  });
      
    
router.get('/login', loginHandle);
router.get("/register", registerHandle);

    
    //Start Server for listening
     server.listen(3000);