const request = require('request');

const base_url = 'https://api.spotify.com/v1/search';
const url = 'https://accounts.spotify.com/api/token';
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
const client_id = '4f26574e1aaa4fa38808bf86d4dcf134';
const client_secret = '9160366928844a9e9cf1b7d210a21564';
// Set the search parameters


const data = {
    grant_type: 'client_credentials',
    client_id: client_id,
    client_secret: client_secret
};

let accessToken = ""


async function getAccessToken() {
    try {
        const response = await new Promise((resolve, reject) => {
            request.post({url: url, form: data, headers: headers}, function(err, response, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        });
        const parsedData = JSON.parse(response);
        const access_token = parsedData.access_token;
        //console.log(access_token);
        return access_token;
    } catch (err) {
        console.error(err);
        return false
    }
}


async function searchArtists(text) {
    const params = {
        q: text,  // The search query
        type: 'artist',  // The type of item to search for
        limit: 10  // The number of results to return
    };
    
    // Set the headers with the access token
    
    try{
        const token = await getAccessToken()
        //console.log(token)
        const headers = {
            'Authorization': 'Bearer ' + token
        };
    
        // Make the GET request to the Spotify Web API
        const response = await new Promise((resolve, reject) => {
            request.get({url: base_url, qs: params, headers: headers}, function(err, response, body) {
            if (err) {
                reject(err);
            } 
            else {
                // Get the JSON data from the response
                const data = JSON.parse(body);
    
                // Print the results
                //console.log(data);
                resolve(data.artists.items)
            }
        });
        })
    
        console.log("response is ")
        console.log(response)
        return response       
    }
    catch(error){
        console.log(error)
        return false
    }
    
}

// Start by refreshing the access token and searching for artists
async function getAll(){
    for(i = 0; i < 100; i++){
        await new Promise(r => setTimeout(r, 500));
        searchArtists();
    }
    console.log("done")
}
//getAll()
searchArtists("JZ")
