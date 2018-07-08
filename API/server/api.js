const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');

const { config } = require('./config');
const { mongoose } = require('../Db/mongoose');
const { empModel } = require('../models/employee');
const bcrypt = require('bcryptjs');
const { userModel } = require('../models/user');
const { logger } = require('../middlewares/logger');
const { authenticate } = require('../middlewares/auth');
const { ObjectID } = require('mongodb');  //extract the objectID directlly else we've to do const b = require(mongodb).objectID
const _ = require('lodash');
var app = express();
app.use(bodyparser.json());
app.use(logger);
app.use(authenticate);
app.post('/employee',(req,res)=>{

    var employee = new empModel(req.body);
    employee.save().then(
        (data) => res.status(201).send(data),
        //(err) =>res.status(400).send(err) instead of catch we can use like this for promise
    ).catch(
        (err) =>res.status(400).send(err)
    )
    
});


//get all employees data
app.get('/employee',(req,res)=>{

    empModel.find().then(
     (data) => res.send({employees:data}),
     (err) =>res.status(400).send(err)
    )
    
});

//get employee data using id
app.get('/employee/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id)) res.status(404).send();
    empModel.findById(id).then(
     (data) =>{
     if(!data) res.status(204);
     res.send({employee:data})
     },
     (err) =>res.status(400).send(err)
    );
});

//get employee data using id
app.delete('/employee/:id',(req,res)=>{
    var id=req.params.id;
    empModel.findByIdAndRemove(id).then(
     (data) => res.send({employee:data}),
     (err) =>res.status(400).send(err)
    )
    
});

//update employee data using id
app.put('/employee/:id',(req,res)=>{
    var id=req.params.id;

    var body =_.pick(req.body,['name','age']);
    if(!ObjectID.isValid(id)) res.status(404).send();
    empModel.findByIdAndUpdate(id,{$set:body},{new:true}).then(
     (data) =>{
     if(!data) res.status(204);
     res.send({employee:data})
     },
     (err) =>res.status(400).send(err)
    );
});


app.post('/user',(req,res)=>{

    var body =_.pick(req.body,['email','password']);
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(body.password,salt,function(err,hash){
            //store hash password in DB
            body.password=hash;
            // var token =jwt.sign({email:body.email},config.SECRET_KEY).toString();
            // console.log(token);
            // body.token=token;  //token is generatinf from generate token
            // console.log(hash);
            var user = new userModel(body);
            user.save().then(user=>{
               // (data) => res.status(201).send(data), //not needed when we're getting token from another place
                //(err) =>res.status(400).send(err) instead of catch we can use like this for promise
                return user.generateAuthToken();
            })
            .then(
                (token) => res.send({'access_token':token})
            )
            .catch(
                (err) =>res.status(400).send(err)
            )
        })
    })
    
});



//login user
app.post('/user/login',(req,res) => {
    var body=_.pick(req.body,['email','password']);
    userModel.findOne({email:body.email}).then(
        (user) => {
            if(!user) res.status(400).send()
            bcrypt.compare(body.password,user.password).then(
                (result)=>{
                    if(result) res.send({status:'success'});
                    res.status(400).send({status:'failed'});
                }
            ) 
        }
    )

})


app.listen(config.PORT,(err) => {
    if(err) throw err;
    console.log(`engine started on ${config.PORT}`)
});
