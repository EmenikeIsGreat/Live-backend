const { MongoClient } = require("mongodb");

const path = require('path');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})
const { ObjectId } = require("mongodb")

const client = new MongoClient(process.env.MONGODB_URL);


async function watchCollection(venue){
    
    await client.connect()
    let venuesDB = await client.db('Live').collection('Venues')
    const changeStream = await venuesDB.watch([
    //   { $match: { "fullDocument.name": "" } }
    ]);
    const change = await changeStream.next(); // Retrieve the next change event from the change stream
    console.log(change);
    await client.close()
}
watchCollection()