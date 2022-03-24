// Import a module
const http = require('http')
// Import Node url module
const url = require('url')
const qs = require('querystring')
const serverHandle = function (req, res) {
  const route = url.parse(req.url)
  const path = route.pathname
  const params = qs.parse(route.query)

  res.writeHead(200, {'Content-Type': 'text/plain'});
  if (path === '/hello' && (params['name'] === 'louis' || params['name'] === 'matthieu') ) {
    res.write('Hello im ' + params['name'] +', a student at ECE and')
    res.write('\n')
    res.write('I love Web technologies and IT technologies')
  } else if (path === '/hello' && 'name' in params){
  	res.write('Hello ' + params['name'])
  } else {
  	 res.writeHead(404, {'Content-Type': 'text/plain'});
  }

  res.end();
}
const server = http.createServer(serverHandle);
server.listen(8080)
