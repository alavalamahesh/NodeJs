const express = require('express');
const hbs = require('hbs');
var pasrer = require('body-parser')
var app = express();
var addingUser = require('./app');
//localhost:4000/about.html
//app.use(express.static('views'))
app.set('view engine','hbs');
//application-type json
app.use(pasrer.json());
app.use(pasrer.urlencoded({extended:true}));

hbs.registerPartials(__dirname+ '/views/partials');
//abc.com/test
app.get('/home', (req,res) => {
    //res.send({'name':'Hellow node object'});//we've several instead of send 
    //res.json({'name':'Hellow node object in json'});
    res.render('home.hbs')
});

app.post('/contact', (req,res) => {
    console.log(req.body);

    addingUser.addUser(req.body);
    addingUser.getUser().then(
        function(result) {console.log(result);} 
    ).catch(

        function(error) {console.log(error);} 
    );

    //req.body.name
    res.render('contact.hbs')
});

app.get('/about',(req,res) => {

    //about
    res.render('about.hbs',
    {name:'mahesh',title:'SE'}
);
});

var users =[];
app.get('/list',(req,res) => {
    users = [
        {name:'mahesh',age:21},
        {name:'johny',age:'20'}
    ];
    res.render('list.hbs' , {users:users})
});
//localhost:4000
app.listen(4000) // we can choose any port here
