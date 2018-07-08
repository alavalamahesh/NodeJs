var userData=[];

const fs =
require('fs');

const file='./user-data.json';

var fetchUsers=()=>{

try{

var uData =
fs.readFileSync(file);

return JSON.parse(uData);

}catch (e){

return [];

}

}

var finduser=(name)=>{

userData = 
fetchUsers();

var user =
userData.filter((u)=>u.name===name);

console.log(user);

return user[0];

}

var addUser=(data)=>{

// userData= fetchUsers();

if(!finduser(data.name)){

userData.push({name:data.name,age:data.age});

fs.writeFileSync(file,JSON.stringify(userData));

}



}

var getUser=()=>{

return JSON.stringify(udata);

}



var getAllusers=()=>{

// fs.readFile(file,(err,data)=>{

// userData = data;

// });

userData= 
fetchUsers();

for(var
i of 
userdata) {

console.log('',i.name);

console.log('',i.age);

}

}

console.log('loading the file');

module.exports={

addUser,

userData

}
