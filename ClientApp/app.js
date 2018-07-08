var dbConnection = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'
const dbname = 'UserDb';

const addUser = (users) => {

    dbConnection.connect(url,(err,client) => {

        if(err){console.log('not able to connect')
        throw err;
    }
    console.log('connected succesfully');
    const dbs =client.db(dbname);
    const collection = dbs.collection('UserData');
    collection.insertOne(users,
    (err,res) => {
        console.log('record inseted into DB')
    }
    )
    
    client.close();
    }
    )
}


var getUser = () => {

    var promise = new Promise(

        (reso,reje) => {
       
            dbConnection.connect(url,(err,client) => {

                if(err){console.log('not able to connect')
                throw err;
            }
    console.log('connected succesfully');
    const dbs =client.db(dbname);
    const collection = dbs.collection('UserData');
        //retrieve data from DB    //put {}for getting all the data
        collection.find({}).toArray().then(
            (res => reso(res)).catch(
                (err => rejo(error))
            )
        );
        
        //for getting only mahesh records from DB
        // collection.find({name:'mahesh'}).toArray().then(
        //     (res => console.log(res))
        // );
        //collection.find({name:'mahesh'}) //for getting specifi data
        client.close();
        }
    );

});
return promise;
}

module.exports = {addUser,getUser}
