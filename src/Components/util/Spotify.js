const client_id = '0652b9a35caa4faaa174069446f3fa1f';
const client_secret = 'f549418e0c4347e397ca21c319bae419';
const endpointURI = 'https://accounts.spotify.com/api/token';
const redirectURI = 'http://localhost:3000/';
let accessToken, expires_in;

const Spotify = {
    // Retrieve access token with user provided credentials
    getAccessToken() {
        if (accessToken) {
            console.log('Access Already Granted.');
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expires_inMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expires_inMatch) {
            console.log('Access Token Granted!');
            accessToken = accessTokenMatch[1];
            expires_in = Number(expires_inMatch[1]);

            sessionStorage.setItem('access_token', accessToken);
            sessionStorage.setItem('expires_in', expires_in);

            // console.log(`Access Token: ${accessToken}`);
            console.log(`Access Expires In: ${expires_in}`);

            window.setTimeout(() => {
                sessionStorage.removeItem('access_token');
                console.log('Access Token has expired!');
            }, expires_in * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            console.log('Fetching new Access Token...');
            let url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent('playlist-modify-public playlist-modify-private playlist-read-private playlist-read');
            url += '&redirect_uri=' + redirectURI;
            url += '&show_dialog=true';
            window.location = url;
        }
    },
    // Search Spotify database
    async search(term) {
        const token = Spotify.getAccessToken();

        console.log(`Searching for: ${term}`);

        const results = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.tracks.items) {
                    const data = jsonResponse.tracks.items.map(tracks => ({
                        name: tracks.name,
                        artists: tracks.artists[0].name,
                        id: tracks.id
                    }));
                    return data;
                } else {
                    console.log(`No results for: '${term}'`);
                }
            })
            .catch(error => console.error(error));
        return results;
    },
    // Save User created playlist to their Spotify account
    async savePlaylist(title = 'New Playlist', tracks) {
        await Spotify.getAccessToken();
        const headers = { 'Authorization': `Bearer ${accessToken}` };
        if (tracks) {
            console.log('Fetching UserID...')
            let userId = await fetch('https://api.spotify.com/v1/me',
                {
                    headers: headers,
                })
                .then(response => response.json())
                .then(data => (data.id))
                .catch(error => console.error(`Failed to retreive userID\n${error}`));
            console.log(`UserID: ${userId}`);
            let playlistId = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: title })
                })
                .then(response => response.json())
                .then(data => data.id)
                .catch(error => console.error(`Failed to create playlistID.\n${error}`));
            console.log(`PlaylistID: ${playlistId}`);
            let snapshotId = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: tracks.map(track => `spotify:track:${track}`) })
                })
                .then(response => response.json())
                .then(data => data)
                .catch(error => console.error(`Failed to upload playlist data.\n${error}`));
            console.log(snapshotId);

        } else {
            console.log('No Tracks in Playlist to save.')
            return;
        }
    }
}

export default Spotify;