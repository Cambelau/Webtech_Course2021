// ./handles.js
// Necessary imports
// Import Node url module
const url = require('url')
const qs = require('querystring')
module.exports = {

  serverHandle: function (req, res) {
  	  const route = url.parse(req.url)
  const path = route.pathname 
  const params = qs.parse(route.query)

  res.writeHead(200, {'Content-Type': 'text/plain'});
  if (path === '/hello' && params['name'] === 'louis' ) {
    res.write('Hello im Louis, a student at ECE and')
    res.write('\n')
    res.write('I love Web technologies')
  } else if (path === '/hello' && 'name' in params){
  	res.write('Hello ' + params['name'])
  } else {
  	 res.writeHead(404, {'Content-Type': 'text/plain'});
  }
  
  res.end();
  } 
}