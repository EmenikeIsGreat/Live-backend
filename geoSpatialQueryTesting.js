const { MongoClient } = require("mongodb");

const path = require('path');

const coolPath = path.join(__dirname, '.env')
require("dotenv").config({path:coolPath})
const { ObjectId } = require("mongodb")



// Define the database name


// Create a new MongoClient
const client = new MongoClient(process.env.MONGODB_URL);


// Connect to the database

async function AddSampleLocations() {
    await client.connect();
    let locationDB = await client.db('todo').collection('userLocation')
    // Create a 2dsphere index
    //await locationDB.createIndex({ location: "2dsphere" });

    // Insert documents with GeoJSON location data
    await locationDB.insertOne({
    location: {
        type: "Point",
        coordinates: [2.2945, 48.8584]
    }
    });

    // let res = await locationDB.insertOne({
    // location: {
    //     type: "Point",
    //     coordinates: [-122.4783, 37.8199]
    // }
    // });
    // console.log(res)
    // Perform a geospatial query using the 2dsphere index

    await client.close()
  }

//AddSampleLocations()


async function findNearest(){
    await client.connect();
    let locationDB = await client.db('Live').collection('User')
    let cursor = await locationDB.find({
        location: {
            $near: {
            $geometry: {
                type: "Point",
                coordinates: [-74.006, 40.7128]
            },
            $maxDistance: 50000000000
            }
        }
        });
    
    let res = await cursor.toArray();
    console.log(res)
    await client.close();
    
}
findNearest()