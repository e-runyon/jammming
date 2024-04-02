import { Buffer } from "buffer";
const client_id = '0652b9a35caa4faaa174069446f3fa1f';
const client_secret = 'f549418e0c4347e397ca21c319bae419';
const endpointURI = 'https://accounts.spotify.com/api/token';
let accessToken;

const Spotify = {
    // Retrieve access token with user provided credentials
    async getAccessToken() {
        // Reuse access token if issued
        if (accessToken) {
            console.log('Access Already Granted.');
            return accessToken
        }
        // Issue new token
        console.log('Fetching new Access Token...');
        const newToken = await fetch(endpointURI, {
            method: 'POST',
            body: new URLSearchParams({
                'grant_type': 'client_credentials'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            }
        })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error));
        accessToken = newToken.access_token;
        window.setTimeout(() => {
            accessToken = '';
            console.log('Access Token has expired!');
        }, newToken.expires_in * 1000)
        window.history.pushState('Access Token', null, '/');
        return newToken;
    },
    async search(term) {
        await Spotify.getAccessToken();
        console.log(`Searching for: ${term}`);
        return await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
            .then(response => response.json())
            .then(data => {
                if(data.tracks.items) {
                    return data.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artists: track.artists[0].name
                    }));
                } else {
                    console.log(`No results for: '${term}'`);
                }
            })
            .catch(error => console.error(error));
    },

    savePlaylist(title, tracks) {
        Spotify.getAccessToken();
        if (title && tracks) {
            console.log('Fetching UserID...')
            const userAccessToken = accessToken;
            const headers = { 'Authorization': `Bearer ${userAccessToken}` };
            const body = {
                'name': title,
            }
            let userID = fetch('https://api.spotify.com/v1/me', headers);
            console.log(`UserID: ${userID}`);
            let playlistID = fetch(`https://api.spotify.com/users/${userID}/playlists`)

        } else {
            console.log('No Tracks in Playlist to save.')
            return;
        }
    }
}

export default Spotify;