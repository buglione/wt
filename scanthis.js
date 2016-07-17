var net = require('net');
var timeout = 2000;

module.exports = function (ctx, cb) { // main 
var host = ctx.data.host;
var port = ctx.data.port;

// create a client object
var client = new net.Socket();
// set timeout 
client.setTimeout(timeout, function() { 
  console.log('Connection timedout to '+ host +' on port '+ port);
  cb(null, 'Sorry, port '+ port + ' is NOT exposed');
  client.destroy(); 
});

client.connect(port, host, function() {
  console.log('Connected to host '+ host +' on port '+ port);
  cb(null, 'Greit, port ' + port + ' is exposed!!!');
  //  don't destroy de socket because we want to listen to data
  //  the socket will self destruct in 2 sec because the timeout
  client.destroy();
});

//client.on('data', function(data) {
 // console.log('Server says: ' + data);
  //cb(null, 'Server says: ' + data + ' port '+ port +' is open');
  //client.destroy();
//});

client.on('error', function (error) {
  console.log("Error connecting to host " + host +" on host "+ port );
  cb(null, 'Error connecting to host ' + host +' on host '+ port );
  client.destroy();
});

client.on('close', function() {
  console.log('Connection closed');
});

} // close main 

