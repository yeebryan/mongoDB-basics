// first, fire up terminal (make sure cd inside the folder)
// npm init
// npm i mongodb
// npm i dotenv - package to keep passwords, API keys and sensitive code out of your code


// begins to code
// setup connection string
// allow us to connect node app to mongo database
// 'require' brings back a huge asset
// mongoClient allows us to use only client features
const MongoClient = require('mongodb').MongoClient;


//set up ENV 
// this dotenv package will look for .env in same directory and process
// create new file > .env
// 'process' represent the OS, and '.env' the environment
// environment contains several variables
// remember to add .gitignore .env file (check whether it is inside)

require('dotenv').config();
console.log(process.env);



// create a client
// place connection string from .env file
// this is an async process
async function main(){

// allow to connect to mongodb
// hide our URL and details of the URL into our process.env

let url = process.env.MONGO_URI; // not URL is URI

// setup our client connection
let client = await MongoClient.connect(url, {
    useUnifiedTopology: true
})

// select which database we want connect
let dnAirbnb = 'sample_airbnb';
let db = client.db(dnAirbnb);

// test collection call
// convert data to an array
let listings = await db.collection("listingsAndReviews").find().limit(10).toArray();
console.log(listings);

}

// call main function separately
main();


// THIS IS HOW WE CAN SET UP CONNECTION TO mongoDB