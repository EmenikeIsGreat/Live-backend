const { MongoClient } = require("mongodb");

const path = require('path');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})
const { ObjectId } = require("mongodb")

const client = new MongoClient(process.env.MONGODB_URL);


const venue = {
    placeId: "",
    Name:"",
    population:0,
    male:0,
    female:0,
    other:0,
    Admin:"",
    venueType:"",
    location: {
        type: "Point",
        coordinates: [-122.4783, 37.8199]
    }

}

async function initIndex(){
    await client.connect()
    let venuesDB = await client.db('Live').collection('Venues')
    await venuesDB.createIndex({ location: "2dsphere" });
    await client.close()
}

//initIndex()


async function createVenue(venue){
    
    await client.connect()
    let venuesDB = await client.db('Live').collection('Venues')
    await venuesDB.createIndex({ location: "2dsphere" });
    let res = await venuesDB.insertOne(venue)
    console.log(res)
    await client.close()
}
createVenue(venue)
