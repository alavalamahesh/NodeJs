const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema preparation
var empSchema = new Schema({

    //validations
    name :{
        type:String,
        required:[true, 'Name required'],
        minlength:4,
        trim:true
    },
    age:{
        type:Number,
        required:[true, 'Name required']
    },
    email:{
        type:String,
        required:[true, 'Name required'],
        unique: true,
        trim:true,
        validate: {
            validator: function(v) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(v);
            },
            message: '{VALUE} is not a valid email '
          },
    }

})


const empModel =mongoose.model('empTbl',empSchema);

module.exports = {empModel}