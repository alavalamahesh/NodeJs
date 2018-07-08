const argv = require('yargs').argv
const axios = require('axios');
const address = argv.address;
var geoCode = require('./geocode.js');
//const address =encodeURIComponent(yargs.address)
console.log(address);
//var results = geoCode.geocodeAPI(address);
geoCode.geoCodeAPI(address).then(
    (data) => {
        weatherAPI(data).then(
       (dt) => console.log(dt.data.currently))
    }
)
.catch(
    (err) => console.log(err)
)

var weatherAPI =(location) => {
    const Wapi =`https://api.darksky.net/forecast/2292b2dcadcfc5c126c9cfe787069518/${location.lat},${location.lng}`
    return axios.get(Wapi);
}