import SpotifyWebApi from 'spotify-web-api-node';

export const spotifyApi = new SpotifyWebApi({
  clientId: '20fa9056e1a5420ba5ea71cc673411b1',
  clientSecret: '9905036bc06f4605942007e2a4b3afbc',
  redirectUri: 'http://localhost:5173/spotify',
});

export function getAuthorizeURL() {
  return spotifyApi.createAuthorizeURL(['playlist-modify-private', 'user-read-private'], 'YOUR_STATE');
}

export function setTokens(code: string) {
  return spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);
      
      // Set the access token and refresh token
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
    })
    .catch(err => {
      console.log('Something went wrong!', err);
    });
}
