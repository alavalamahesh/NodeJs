var http = require('https');
fs = require('fs');
var uname = 'Integrations';
var pword = 'Brillio@123';

//Check if updateDate file exists and is not empty
try {
    var RestLink = fs.readFileSync('RestLinks.txt');
    console.log('Rest Link is: ' + RestLink);
    } catch (e) {
    // add error logic
    console.log('reading Rest Link is Failed: ' + RestLink);
    }
    debugger;
var options = {
    url : RestLink,
    headers: {
    'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    }
    };
    
    //Invoke REST resource for Employee New Hires
var request = http.get(options, function(res){
    console.log(options.headers);
var body = "";
    res.on('data', function(data) {
    body += data;
    });
    res.on('end', function() {
        console.log(" Data from the res "+data);
    })
    res.on('error', function(e) {
    console.log("Got error: " + e.message);
    });
    });