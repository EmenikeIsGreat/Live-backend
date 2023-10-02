const { MongoClient } = require("mongodb");

const path = require('path');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})
const { ObjectId } = require("mongodb")

const client = new MongoClient(process.env.MONGODB_URL);



async function addSubChat(venueName, chatName) {
    try {
        await client.connect();
        let venuesDB = client.db('Live').collection('Venues');
        
        // Update the venue document
        let res = await venuesDB.updateOne(
            { "Name": venueName }, 
            { $push: { "subChats": chatName } }
        );
        
        console.log(res);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

addSubChat("Kimball Hall","leftSide")

