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

var getUser = (name,callback,age) => {
    user.name=name;
    setTimeout(
    () =>callback(user),
    6000)
    setTimeout(
        () =>age(user),
        8000)
        
}

getUser(
    'mike',
    (data) => console.log('callback->',data),
    (err) => console.log('age->',err)
);

console.log('app Finished');