const { userModel } = require('../models/user');

var authenticate = (req,res,next) =>{

    if(req.url.includes('/user')) {
        next();
    }
    else{
    var token = req.header('Authorization');
    //if(!headers) res.status(401).send();
    userModel.findByToken(token).then(
        (data)=>{
            if(!data){return Promise.reject}
            next();
        }
    ).catch(
        (err)=> res.status(401).send({'Msg':'Unauthorized'})
    )
}
}


module.exports={authenticate};