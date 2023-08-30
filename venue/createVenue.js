const { MongoClient } = require("mongodb");

const path = require('path');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})
const { ObjectId } = require("mongodb")

const client = new MongoClient(process.env.MONGODB_URL);


const venue1 = {
    Name:"Alcatraz",
    population:0,
    male:0,
    female:0,
    other:0,
    Admin:"",
    venueType:"",
    geometry: {
        type: "Polygon",
        coordinates: [
            [
                [-122.426, 37.828],
                [-122.421, 37.828],
                [-122.421, 37.825],
                [-122.426, 37.825],
                [-122.426, 37.828]
            ]
        ]
    },
    center: {
        type: "Point",
        coordinates: [-122.4235, 37.82685]
    }

}


const venue2 = {
    Name:"Alcatraz",
    population:0,
    male:0,
    female:0,
    other:0,
    Admin:"",
    venueType:"",
    geometry: {
        type: "Polygon",
        coordinates: [
            [
                [-122.418, 37.797],
                [-122.408, 37.797],
                [-122.408, 37.792],
                [-122.418, 37.792],
                [-122.418, 37.797]
            ]
        ]
    },
    center: {
        type: "Point",
        coordinates: [-122.4235, 37.82685]
      },

}

const holyCross = {
    Name: "College of Holy Cross",
    population: 0,
    male: 0,
    female: 0,
    other: 0,
    Admin: "",
    venueType: "",
    geometry: {
        type: "Polygon",
        coordinates: [
            [
                [-71.80817, 42.23729],
                [-71.80817, 42.23729],
                [-71.80817, 42.23729],
                [-71.80817, 42.23729],
                [-71.80817, 42.23729]
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
createVenue(venue2)

async function findWithin() {
    await client.connect();
    let locationDB = await client.db('Live').collection('Venues')
    let cursor = await locationDB.updateMany({
        geometry: {
            $geoIntersects: {
                $geometry: {
                    type: "Point",
                    coordinates: [-122.4235, 37.8275]
                }
            }
        }
    },{
        $inc: { male: 1, female:1, population:1 }
      })
    // let results = await cursor.toArray();
    console.log(cursor);
    client.close()
}


//findWithin()

async function findVenuesNear(){
    await client.connect();
    let locationDB = await client.db('Live').collection('Venues')
    let query = {
        center: {
        $geoWithin: {
            $centerSphere: [[-122.45876304,37.65600376], 5000]
        }
    }
    };
    let cursor = await locationDB.find(query)
    let results = await cursor.toArray();
    console.log(results);
    client.close()

}
//findVenuesNear()
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
                coordinates: [-122.414, 37.795]
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
