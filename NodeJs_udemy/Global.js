setTimeout(function(){

    console.log('Checking the global object with timeout function')
},10000);

var time=0;
var timer =setInterval(function(){
    time +=2;
    console.log(time+'Checking the global object with Interval function');
    if(time>=8)
    clearInterval(timer);
},5000);


console.log(__dirname);
console.log(__filename);