const { MongoClient } = require("mongodb");

const path = require('path');

const coolPath = path.join(__dirname, '../.env')
require("dotenv").config({path:coolPath})
const { ObjectId } = require("mongodb")

const client = new MongoClient(process.env.MONGODB_URL);



async function generateAndInsertRandomMessages(numMessages, numFromUser, userId, venue) {
    await client.connect()
    let messageCollection = await client.db('Live').collection('Messages')
    const messages = [];
    for (let i = 0; i < numMessages; i++) {
      const message = {
        venue,
        userId: i < numFromUser ? userId : `user${i + 1}`,
        profilePic: `https://example.com/profile-pic-${i + 1}.jpg`,
        body: `Random message ${i + 1}`,
        reactions: {
          like: Math.floor(Math.random() * 10),
          love: Math.floor(Math.random() * 10),
          haha: Math.floor(Math.random() * 10)
        },
        replyingTo: null,
        anonymousUserName: null,
        isPinned: false,
        createdAt: new Date()
      };
      messages.push(message);
      await messageCollection.insertOne(message);
    }
    client.close()
    return messages;
  }

  generateAndInsertRandomMessages(10,3,"Emenike","Alcatraz")
  