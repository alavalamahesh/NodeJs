var uname = 'Integrations'
var pword = 'Brillio@123'
var http = require('https');
var options = {
    host: 'hcgt-test.hcm.us1.oraclecloud.com',
port: 443,
//path: pathUri,
path: '/hcmCoreApi/atomservlet/employee/newhire',
"rejectUnauthorized" : false,
headers: {
'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
} 
 };
 //this is the call
 request = http.get(options, function(res){
    var body = "";
    res.on('data', function(data) {
       body += data;
    });
    res.on('end', function() {
     //here we have the full response, html or json object
       console.log(body);
    })
    res.on('error', function(e) {
       onsole.log("Got error: " + e.message);
    });
     });
