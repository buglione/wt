var net = require('net');

// timeout to ensure no resources are wasted
var timeout = 2000;

// define wt for code exec
module.exports = function (ctx, cb) { // main
var host = ctx.data.host;
var start = ctx.data.start;
var end = ctx.data.end;

// scanning loop 
while (start <= end) { // while
  var port = start;
  console.log('Checking port '+ port);
  // anonynous function to pass the current port and operate on it
  // socket encapsulation in order to preseve the value of 'port' for the callbacks 
  (function(port) {
    var client = new net.Socket();
    client.setTimeout(timeout, function() { client.destroy(); });
    client.connect(port, host, function() {
      console.log('Connected to port '+ port);
      cb(null, 'Awesome, port ' + port + ' is exposed!!!');
      client.destroy();
    });
    
    client.on('error', function(e) {
        client.destroy();
    });
})(port);
  start++;
} // while

} // main
