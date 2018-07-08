const mongoose = require('mongoose');
const {config} = require('../server/config');

mongoose.Promise = global.Promise;
mongoose.connect(`${config.DB_URL}/${config.DB}`)


module.exports={mongoose};