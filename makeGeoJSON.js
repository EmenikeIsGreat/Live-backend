const { MongoClient } = require("mongodb");

const path = require('path');

const coolPath = path.join(__dirname, '.env')
require("dotenv").config({path:coolPath})
const { ObjectId } = require("mongodb")

const client = new MongoClient(process.env.MONGODB_URL);


async function initIndex(collection){
    await client.connect()
    let venuesDB = await client.db('Live').collection(collection)
    await venuesDB.createIndex({ location: "2dsphere" });
    await client.close()
}
initIndex("User")