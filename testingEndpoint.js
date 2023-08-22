const axios = require('axios');

const request = {
    method: 'POST',
    url: 'https://us-east-1.aws.data.mongodb-api.com/app/live-backend-fjlhj/endpoint/updateUsersLocation',
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
        foo: 'bar'
    }
};

axios(request)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
