var http = require('http'),
fs = require('fs'),
url = require('url'),
ejs = require('ejs'),
ws = require('./british_words.json'),
tmpl = fs.readFileSync(__dirname + '/home.ejs', 'utf8');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
    var words = [],
    args = url.parse(req.url, true).query;
    if(args !== undefined && args['q'] !== undefined){
      var q = args['q'];
      for(var x in ws){if(ws[x].indexOf(q)>=0){words.push(ws[x]);}}
    }
    res.write(ejs.render(tmpl, {words:words,q:q}))
    res.end();
}).listen(9002);

console.log('Server running at http://127.0.0.1:9002/');
