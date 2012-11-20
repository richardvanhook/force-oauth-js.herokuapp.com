var http = require('http');
var fs   = require('fs');
var _    = require('underscore');

var server = http.createServer(function(req, res) {
  var path = '';
  if(req.url) path = _.first(req.url.split('?'));
  console.log(path);
  var publicFile;
  try{
    publicFile = fs.readFileSync('public' + path);
  }catch(err){}
  if(publicFile){
    res.writeHead(200);
    res.end(publicFile);
  } else {
    try{
      var template = _.template(fs.readFileSync('public/index.html', 'utf8'));
      res.writeHead(200);
      res.end(template({
        CLIENT_ID: process.env.CLIENT_ID
      }));
    }catch(err){
      res.writeHead(500);
      res.end('<html><body><h1>Error Occurred:</h1><p>' + err.message + '</p></body></html>');
    }
  }
});
server.listen(process.env.PORT || 5000);
