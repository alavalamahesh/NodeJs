var userdata=require('./userFunction.js')



const fs =
require('fs');

const file='./user-data.json';

var userDatea=[];

var addaUser=(data)=>{

userData.push({name:data.name,age:data.age});

fs.writeFile(file,userData);

}

const argv=require('yargs').argv;

const func=argv._[0];

console.log('aa ',argv._[0]);

if(func ===
'add'){

const data={name:
argv.name,age:argv.age}

userdata.addUser(data);

//console.log('udata value: '+userdata.getUser());

}else if(func ===
'get'){

userdata.getAllusers();

}else if(func ===
'undefind'){

console.log('yes');



}else{

console.log('not performing anything');

}
