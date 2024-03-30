import { Buffer } from "buffer";
const client_id = '0652b9a35caa4faaa174069446f3fa1f';
const client_secret = 'f549418e0c4347e397ca21c319bae419';
const endpointURI = 'https://accounts.spotify.com/api/token';
let accessToken;

function Spotify() {
    // Retrieve access token with user provided credentials
    async function getAccessToken() {
        // Prevent reroll
        if (accessToken) {
            console.log('Access Already Granted.');
            return accessToken
        }
        console.log('Fetching new Access Token...');
        try {
            const response = await fetch(endpointURI, {
                method: 'POST',
                body: new URLSearchParams({
                    'grant_type': 'client_credentials'
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch access token');
            }

            console.log('Access Granted!')
            const data = await response.json();
            accessToken = data.access_token;
            const {token_type, expires_in} = data;
            console.log(`Token Type: ${token_type}\nExpires In: ${expires_in}`);
            window.setTimeout(() => {
                accessToken = '';
                console.log('Access Token has Expired!');
            }, expires_in * 1000);
            window.history.pushState('Access Token', null, '/');
            return data;
        }
        catch (error) {
            console.error(error);
        }
    }

    async function search(term) {
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error));
    }

    return {
        getAccessToken: getAccessToken(),
    }
}

export default Spotify;