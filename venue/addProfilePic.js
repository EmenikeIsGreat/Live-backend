const axios = require('axios');
const fs = require('fs');
const https = require('https');
const { MongoClient, ObjectId } = require('mongodb');

const path = require('path');
const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})
const client = new MongoClient(process.env.MONGODB_URL);

const FormData = require('form-data');

async function uploadphoto(imageURI, venueId) {
    try {
        let body = new FormData();
        body.append('file', fs.createReadStream(imageURI), { filename: 'Emenike' });
        body.append('UPLOADCARE_PUB_KEY', '26e7dac32079df689feb');
        body.append('UPLOADCARE_STORE', '1');

        const url = 'https://upload.uploadcare.com/base/';
        let response = await axios.post(url, body, { headers: body.getHeaders() });

        console.log(response.data.file);

        // Connect to the database and update the document
        await client.connect();
        let venuesDB = await client.db('Live').collection('Venues');
        console.log(await venuesDB.updateOne({ _id: new ObjectId(venueId)}, { $set: { 'profilePic': response.data.file } }));
        await client.close();

        return response.data.file;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//uploadphoto("venue/sample.png","65036b2a1d6f1dd8bb02a481")

async function deletePhoto(fileId, venueId) {
    try {
        const url = `https://api.uploadcare.com/files/${fileId}/`;
        const agent = new https.Agent({  
            rejectUnauthorized: false
        });
        let response = await axios.delete(url, {
            headers: { 
                "Authorization": "Uploadcare.Simple 26e7dac32079df689feb:26b01472850abced4292",
                "Content-Type": "application/json"
            },
            httpsAgent: agent
        });
        
        console.log(response.data);

        // Connect to the database and update the document
        await client.connect();
        let venuesDB = await client.db('Live').collection('Venues');
        await venuesDB.updateOne({ _id: new ObjectId(venueId) }, { $unset: { 'profilePic': "" } });
        await client.close();

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Call these functions like this:
// uploadphoto("venue/sample.png", "your-venue-id");
// deletePhoto("your-file-id", "your-venue-id");

deletePhoto("52557032-3f5c-4f08-8550-41cf00858d4f","65036b2a1d6f1dd8bb02a481")

