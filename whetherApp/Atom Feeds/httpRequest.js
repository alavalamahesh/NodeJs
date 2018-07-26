var et = require('elementtree');
var request = require('request');
var uname = 'Integrations';
var pword = 'Brillio@123';
var http = require('https');
fs = require('fs');
var restLinks = [];

var XML = et.XML;
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;

var lastFeedUpdateDate = '2018-01-01T05:34:54.792Z';
var pathUri = '';

//Check if updateDate file exists and is not empty
try {
var lastFeedUpdateDate = fs.readFileSync('./whetherApp/Atom Feeds/updateDates');
console.log('Last Updated Date is: ' + lastFeedUpdateDate);
} catch (e) {
// add error logic
}

//get last feed updated date to get entries since that date
if (lastFeedUpdateDate.length > 0) {
pathUri = '/hcmCoreApi/atomservlet/employee/termination?updated-min=' + lastFeedUpdateDate;
} else {
pathUri = '/hcmCoreApi/atomservlet/employee/termination';
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
var atomRequest = http.get(options, function(res){
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

for ( var i = 0; i < content.length-9; i++ ) {
//console.log(feed.findall('./entry/link/[@rel="related"]')[i].get('href'));
restLinks.push(feed.findall('./entry/link/[@rel="related"]')[i].get('href'));
//console.log(feed.findall('content.text'));
//persist timestamp for the next call
if (i == 0) {
    // console.log(updateDate[0].text);
    // console.log(entryId[i].text);
     //console.log(content[i].text);
fs.writeFile('./whetherApp/Atom Feeds/updateDate', updateDate[0].text, function(fserr) {
if (fserr) throw fserr; } );
}
//console.log('Context content is\n '+content[i].text); //to print context od each item
fs.writeFile("./whetherApp/Atom Feeds/mahesh",restLinks, function(fserr) {
    if (fserr) throw fserr;})
console.log(restLinks[i]);
var restUrl = {
    url: restLinks[i],
    auth: {
      user: uname,
      password: pword
    }
  }

  request(restUrl, function (err, resp, body) {
    if (err) {
      console.dir(err)
      return
    }
    //  console.dir('headers', resp.headers)
    //  console.dir('status code', resp.statusCode)
    //console.dir('Body is having below data '+body);
console.dir('resp statusCode is having below data = '+JSON.stringify(resp.statusCode));
var myEscapedJSONString = body.replace(/\\n/g, "\\n")
                                      .replace(/\\'/g, "\\'")
                                      .replace(/\\"/g, '\\"')
                                      .replace(/\\&/g, "\\&")
                                      .replace(/\\r/g, "\\r")
                                      .replace(/\\t/g, "\\t")
                                      .replace(/\\b/g, "\\b")
                                      .replace(/\\f/g, "\\f");

    console.log('JSON String response for each record \n' + myEscapedJSONString);
    var myEscapedJSONStringobj = JSON.parse(myEscapedJSONString);
    var mailId=myEscapedJSONStringobj.items[0].WorkEmail;
    console.log(mailId);

  })

}

}

})
res.on('error', function(e) {
console.log("Got error: " + e.message);
});
});

