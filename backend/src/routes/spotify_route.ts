import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi();

const token = 'BQDhx6wHIFLAbW0B6d3a8zXC1wE4vQWGTTfiVZlkWc_MOuJLb8FAvn2doVvZ0sTXodN_eqlR8RoBhv9aysSUzo1vJyPRCAtwU_Ipm-RHaXrCKig3yhufvB4a_85oyFEdUl5pMqsvKKRBKHlixtxgi2wYKjUW6XhX84IPqAUOBqEBMmCGzgA-y9DH3IQD-Cu_g4f_WEjh597okNu3CNxVYUOv0NGSzF6SIp-K-PDsNBa4zpAiPOlJp3eDl3eacj12c_D3uSO_ySpvhLjs8Xqmnaed04BtH65uMWlPlFi16zweIBioDYeesBkucI3yWg';

spotifyApi.setAccessToken(token);

(async () => {
	const me = await spotifyApi.getMe();
	console.log(me);
})().catch(e => {
	console.error(e);
});
