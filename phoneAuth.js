const accountSid = 'ACee900de86ef54478cb468a0856fd56f4';
const authToken = '7c3a95a93c94cf7c2a9877a71a4caacd';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hello World',
        from: '+18334140759',
        to: '+16172869610'
    })
    .then(message => console.log(message.sid))