var convert = require('../src/cssobj-converter.js')
var http = require('http')
var debug = require('debug')('cssobj')

var port = 8080
var server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)

  res.writeHead(200, {'Content-Type': 'text/plain'})
  if (req.method == 'POST') {
    var bodyString = ''
    req.on('data', function (data) {
      bodyString += data
    })

    req.on('end', function () {
      try {
        var json = JSON.parse(bodyString || '')
        debug(bodyString)
        var result = convert(json.text)
      } catch(e) {
        debug(e)
        return res.end('')
      }
      res.end(JSON.stringify(result, null, 2))
    })
  }
}).listen(port, e => console.log('Listen on ', port))
