var et = require('elementtree');
 
var uname = 'Integrations';
var pword = 'Brillio@123';
var http = require('https');
fs = require('fs');
var restLinks=[];
 
var XML = et.XML;
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;
 
var lastFeedUpdateDate = '';
var pathUri = '';
 
//Check if updateDate file exists and is not empty
try {
var lastFeedUpdateDate = fs.readFileSync('updateDate');
console.log('Last Updated Date is: ' + lastFeedUpdateDate);
} catch (e) {
// add error logic
}
 
//get last feed updated date to get entries since that date
if (lastFeedUpdateDate.length > 0) {
pathUri = '/hcmCoreApi/atomservlet/employee/newhire?updated-min=' + lastFeedUpdateDate;
} else {
pathUri = '/hcmCoreApi/atomservlet/employee/newhire';
}
 
// Generate Request Options
var options = {
//ca: fs.readFileSync('HCM Cert'), //get HCM Cloud certificate - either through openssl or export from web browser
host: 'hcgt-test.hcm.us1.oraclecloud.com',
port: 443,
//path: pathUri,
path: pathUri,
"rejectUnauthorized" : false,
headers: {
'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
}
};
 
//Invoke REST resource for Employee New Hires
var request = http.get(options, function(res){
    console.log(options.headers);debugger;
var body = "";
res.on('data', function(data) {
body += data;
});
res.on('end', function() {
 
//Parse Atom Payload response 
feed = et.parse(body);
 
//Get Entries count
var numberOfEntries = feed.findall('./entry/').length;
 
console.log('...................Feed Extracted.....................');
console.log('Numer of Entries: ' + numberOfEntries);
 
//Process each entry
if (numberOfEntries > 0) {
 
console.log('Get Content for each Entry');
 
var content = feed.findall('./entry/content/');
var entryId = feed.findall('./entry/id');
var updateDate = feed.findall('./entry/updated');
 
for ( var i = 0; i < content.length; i++ ) {
console.log(feed.findall('./entry/link/[@rel="related"]')[i].get('href'));
restLinks.push(feed.findall('./entry/link/[@rel="related"]')[i].get('href'));
    fs.appendFile('RestLinks.txt', restLinks, (err) => {
        if (err) throw err;
      });
console.log(feed.findall('content.text'));
 
//persist timestamp for the next call
if (i == 0) {
    console.log(updateDate[0].text);
    console.log(entryId[i].text);
    console.log(content[i].text);
fs.writeFile('updateDate', updateDate[0].text, function(fserr) {
if (fserr) throw fserr; } );
}
 
// fs.writeFile(entryId[i].text,content[i].text, function(fserr) {
// if (fserr) throw fserr; } );
}
}
 
})
res.on('error', function(e) {
console.log("Got error: " + e.message);
});
});