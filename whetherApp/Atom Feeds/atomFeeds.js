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

var lastFeedUpdateDate = '2018-01-01T01:34:54.792Z';
var pathUri = '';

//get last feed updated date to get entries since that date
if (lastFeedUpdateDate.length > 0) {
    pathUri = '/hcmCoreApi/atomservlet/employee/termination?updated-min=' + lastFeedUpdateDate;
} else {
    pathUri = '/hcmCoreApi/atomservlet/employee/termination';
}

// Generate Request Options
var options = {
    host: 'hcgt-test.hcm.us1.oraclecloud.com',
    port: 443,
    //path: pathUri,
    path: pathUri,
    "rejectUnauthorized": false,
    headers: {
        'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
    }
};

//Invoke REST resource for Employee New Hires
var atomRequest = http.get(options, function (res) {
    var body = "";
    res.on('data', function (data) {
        body += data;
    });
    res.on('end', function () {

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
            var termination = [];
            for (var i = 0; i < content.length - 7; i++) {
                restLinks.push(feed.findall('./entry/link/[@rel="related"]')[i].get('href'));
                var contentData =content[i].text
                
                contentData=JSON.stringify(contentData);
                // termination.push(content[i])
                // console.log(termination[i].text);
            }
            //console.log(termination);
        }

    })
    res.on('error', function (e) {
        console.log("Got error: " + e.message);
    });
});
