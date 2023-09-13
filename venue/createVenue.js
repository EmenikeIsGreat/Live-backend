const { MongoClient } = require("mongodb");

const path = require('path');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})
const { ObjectId } = require("mongodb")

const client = new MongoClient(process.env.MONGODB_URL);


// these coordinates to need be going in descending order in order to work
const Alcatraz = {
    Name:"Alcatraz",
    population:0,
    male:0,
    female:0,
    other:0,
    Admin:[],
    venueType:"",
    geometry: {
        type: "Polygon",
        coordinates: [
            [
                [ -122.418, 37.797 ],
                [ -123.408, 37.792 ],
                [ -123.418, 39 ],
                [ -122.408, 39 ],
                [ -122.418, 37.797 ]
            ]            
        ]
        
    },
    center: {
        type: "Point",
        coordinates: [-122.4235, 37.82685]
      },
}

const holyCross = {
    Name: "Holy Cross",
    population: 0,
    male: 0,
    female: 0,
    other: 0,
    Admin: [],
    venueType: "",
    geometry: {
        type: "Polygon",
        coordinates: [
            [ 
                [ -71, 40 ], 
                [ -72, 40 ],
                [ -72, 43 ], 
                [ -71, 43 ], 
                [ -71, 40 ] 
              ]              
        ]
    },
    center: {
        type: "Point",
        coordinates: [-71.80817, 42.23729]
      },
}



const anotherVenue = {
    Name: "maraina District",
    population: 0,
    male: 0,
    female: 0,
    other: 0,
    Admin: "",
    venueType: "Museum",
    location: {
        type: "Point",
        coordinates: [-122.436, 37.803]
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
//createVenue(holyCross)

async function findWithin() {
    await client.connect();
    let locationDB = await client.db('Live').collection('Venues')
    let cursor = await locationDB.find({
        geometry: {
            $geoIntersects: {
                $geometry: {
                    type: "Point",
                    coordinates: [-122.4235, 37.82685]
                }
            }
        }
    },//{
    //     $inc: { male: 1, female:1, population:1 }
    //   }
    )
    // let results = await cursor.toArray();
    console.log(await cursor.toArray());
    client.close()
}


//findWithin()

async function findNear() {
    await client.connect();
    let locationDB = await client.db('Live').collection('Venues')
    //await locationDB.createIndex({ "geometry": "2dsphere" });
    let cursor = await locationDB.find(
        {
          location:
            { $near:
               {
                 $geometry: { type: "Point",  coordinates: [-122.4235, 37.82685] },
                 $minDistance: 1000,
                 $maxDistance: 5000000000000000000000000000000000
               }
            }
        }
     )
    console.log(await cursor.toArray());
    client.close()
}
//findNear()

async function getVenues() {
    await client.connect()
    const locationDB = await client.db('Live').collection('Venues');
    const query2 = {
        geometry: {
            $geoIntersects: {
              $geometry: {
                type: "Point",
                coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]
              }
            }
          }
    };
    const query = {
        geometry: {
            $geoIntersects: {
              $geometry: {
                type: "Point",
                coordinates: [-122.4235, 37.82685]
              }
            }
          }
    };
    
    const venues = await locationDB.find(query).toArray();
    console.log(venues)
    await client.close()
    return venues;
}

//getVenues()
