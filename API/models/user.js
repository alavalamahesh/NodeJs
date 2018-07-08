const mongoose = require('mongoose');
const{config} = require('../server/config');
const jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

//schema preparation
var userSchema = new Schema({

    email:{
        type:String,
        required:[true, 'Mail is required'],
        unique: true,
        trim:true,
        validate: {
            validator: function(v) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(v);
            },
            message: '{VALUE} is not a valid email '
          },
    },
    
    tokens:[
        {
            token:{
        type:String,
        required:true
    }
}
],
    password:{
        type:String,
        required:[true, 'Name required'],
        minlength:10

    }
})

//generating  the new token in DB 
userSchema.methods.generateAuthToken = function(){
    var user =this;
    var token =jwt.sign({_id:user._id.toHexString()},config.SECRET_KEY).toString();
    user.tokens.push({token});
    return user.save().then(
        (data) => {
            return token;
        }
    )
}

// this function return only promise
userSchema.statics.findByToken = function(token){
    var user =this;
    try{
    var decodeJwt = jwt.verify(token,config.SECRET_KEY);
    }
    catch(e){
        return Promise.reject();

    }
    return user.findOne({
        '_id':decodeJwt._id,
        'tokens.token':token
    })
}
const userModel =mongoose.model('usrTbl',userSchema);
module.exports = {userModel}