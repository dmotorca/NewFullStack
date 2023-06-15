import { SpotifyWebApi } from 'spotify-web-api-node';

// Set necessary parts of the credentials on the constructor

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: '20fa9056e1a5420ba5ea71cc673411b1',
  clientSecret: '9905036bc06f4605942007e2a4b3afbc',
  redirectUri: 'http://localhost:5173/spotify'
});

spotifyApi.setAccessToken('BQB1XU549-TmZ-ku-xyiNMNYdczMfRGBIQofHinRUNLf3N3cvg4xT90Bxg8YgDFfyWIx5AMh2IDTqgjeBmvJmxSwB00fKtXbTPprTyr_MznbZNC9imIjaPmai_G7AgmeNjCvbO4xtOELsCs4aW2DcP2uip2IGjC6RVZxmkfCfbDW3H7Aavt5lj4dpfKgbNiwEBpi0aR-HBR2cRB1hpt53p0iwToiqciYPVi3ife50n9b6cstnaBA9aLINSddWUXO_4floYRJOzWNjI_jl1Su3ZT6W3wtzMpPct_5d_JpQ84T8BJvlFDLdJogN6sqnw');

spotifyApi.createPlaylist('your_user_id', 'My Shared Playlist', { 'public' : true })
  .then(function(data) {
    console.log('Created playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });


spotifyApi.addTracksToPlaylist('your_playlist_id', ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'])
  .then(function(data) {
    console.log('Added tracks to playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
