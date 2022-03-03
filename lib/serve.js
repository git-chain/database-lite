var fs = require('fs');
var path = require('path');
var dot = /\.\.+/g;
var slash = /\/\/+/g;

function CDN(dir){
	return function(req, res){
		req.url = (req.url||'').replace(dot,'').replace(slash,'/');
		if(serve(req, res)){ return } // filters GUN requests!
		if (req.url.slice(-3) === '.js') {
			res.writeHead(200, {'Content-Type': 'text/javascript'});
		}
		fs.createReadStream(path.join(dir, req.url)).on('error',function(tmp){ // static files!
			fs.readFile(path.join(dir, 'index.html'), function(err, tmp){
				try{ res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(tmp+''); }catch(e){} // or default to index
		})}).pipe(res); // stream
	}
}

function serve(req, res, next) {
    return void;
}

module.exports = serve;
