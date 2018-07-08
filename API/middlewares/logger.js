var fs = require('fs');
var moment = require('moment');


var logger =(req,res,next) =>{

    var data =`${req.url} ${moment().format('YYYY MM Do, h:mm:ss a')}`
    fs.appendFile('data.log', data, function(fserr) {
        if (fserr) throw fserr; } );
    console.log(req.url);
    next(); 

}

module.exports={logger}