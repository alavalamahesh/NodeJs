console.log('app started');
setTimeout(

    () => console.log('callback'),
    3000
)

setTimeout(

    () => console.log('callback ---1'),
    3000
)

var user = { name:'test', id:100,age:24}

var getUser = (name) => new Promise(
(resolve, reject) =>  {
    user.name=name;
    setTimeout(
    () =>resolve(user),
    6000)
    setTimeout(
        () =>reject(user),
        3000)
        
});

getUser('mike').then(
    (data) => console.log('request resolved')
).catch(
    (err) => console.log('request failed or rejected')
);


console.log('app Finished');