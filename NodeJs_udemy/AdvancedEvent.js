var events = require('events');
var util = require('util');

var Students = function(name){

    this.name =name;
}
util.inherits(Students,events.EventEmitter);