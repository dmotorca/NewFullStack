import { useState, useEffect } from "react";
import SpotifyWebApi from 'spotify-web-api-node';

interface SpotifyProps {
	clientId: string,
	redirectUri: string,
}
const token = 'BQDhx6wHIFLAbW0B6d3a8zXC1wE4vQWGTTfiVZlkWc_MOuJLb8FAvn2doVvZ0sTXodN_eqlR8RoBhv9aysSUzo1vJyPRCAtwU_Ipm-RHaXrCKig3yhufvB4a_85oyFEdUl5pMqsvKKRBKHlixtxgi2wYKjUW6XhX84IPqAUOBqEBMmCGzgA-y9DH3IQD-Cu_g4f_WEjh597okNu3CNxVYUOv0NGSzF6SIp-K-PDsNBa4zpAiPOlJp3eDl3eacj12c_D3uSO_ySpvhLjs8Xqmnaed04BtH65uMWlPlFi16zweIBioDYeesBkucI3yWg';
const spotify = new SpotifyWebApi({ accessToken: 'BQDhx6wHIFLAbW0B6d3a8zXC1wE4vQWGTTfiVZlkWc_MOuJLb8FAvn2doVvZ0sTXodN_eqlR8RoBhv9aysSUzo1vJyPRCAtwU_Ipm-RHaXrCKig3yhufvB4a_85oyFEdUl5pMqsvKKRBKHlixtxgi2wYKjUW6XhX84IPqAUOBqEBMmCGzgA-y9DH3IQD-Cu_g4f_WEjh597okNu3CNxVYUOv0NGSzF6SIp-K-PDsNBa4zpAiPOlJp3eDl3eacj12c_D3uSO_ySpvhLjs8Xqmnaed04BtH65uMWlPlFi16zweIBioDYeesBkucI3yWg' });


export const Spotify = ({ clientId, redirectUri }: SpotifyProps) => {
	
	const scopes = [
		'ugc-image-upload',
		'user-read-playback-state',
		'user-modify-playback-state',
		'user-read-currently-playing',
		'streaming',
		'app-remote-control',
		'user-read-email',
		'user-read-private',
		'playlist-read-collaborative',
		'playlist-modify-public',
		'playlist-read-private',
		'playlist-modify-private',
		'user-library-modify',
		'user-library-read',
		'user-top-read',
		'user-read-playback-position',
		'user-read-recently-played',
		'user-follow-read',
		'user-follow-modify'
	];
	
	const login = () => {
		const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;
		window.location.href = url;
	};
	
	return (
		<div>
			<h1>Display your Spotify profile data</h1>
			
			<section id="profile">
				<h2>Logged in as <span id="displayName"></span></h2>
				<span id="avatar"></span>
				<ul>
					<li>User ID: <span id="id"></span></li>
					<li>Email: <span id="email"></span></li>
					<li>Spotify URI: <a id="uri" href="#"></a></li>
					<li>Link: <a id="url" href="#"></a></li>
					<li>Profile Image: <span id="imgUrl"></span></li>
				</ul>
			</section>
			
			<button onClick={login}>Log in with Spotify</button>
		</div>
	);
};

