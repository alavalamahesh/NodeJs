const axios = require('axios');
const key='AIzaSyDq8KaoN6fR10SFmRNjkAzB3_KmnESSpI4'
var geoCodeAPI = (address) =>{

    return new Promise(
(resolve,reject) => {

    //const api = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +address+'&key='+key
    //string literal tech in JS below
    const apiNew = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
    axios.get(apiNew).then(
        (data) => {
            //console.log('success',JSON.stringify(data.data));
        //return data; to return the data
        var loc = data.data.results[0].geometry.location;
            resolve(loc);
    }
        
    
    ).catch(
        //(err) => console.log('err',err)
        (err) => reject(err)
    );  
}

    )
}


module.exports = {geoCodeAPI};