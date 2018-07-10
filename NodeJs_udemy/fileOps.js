var fs = require('fs');
// Sync methods
// var read_File=fs.readFileSync('text.txt','utf8');
// console.log(read_File);


// //fs.writeFileSync('text1.txt','Adding the content');
// fs.writeFileSync('text1.txt',read_File);


//Asynch methods and callbacks
var read_data=fs.readFile('text.txt','utf8',function(err,data){

    if(err)
    return console.log('Error while reading the file'+err)

    console.log(data);
})

console.log('the file is read');

fs.writeFile('text3.txt',read_data,function(err,data){
    if(err)
    console.log('Error in writing the file'+err)

    console.log('Data in write file'+data)
})

console.log('write operation is done succesfully');

//deleting the file
fs.unlink('text3.txt');

//creating directory
fs.mkdirSync('nodeDirectory');

//removing directory
fs.rmdirSync('nodeDirectory');

