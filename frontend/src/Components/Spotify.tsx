import { useState, useEffect } from "react";

interface SpotifyProps {
	clientId: string,
	redirectUri: string,
}

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
			<button onClick={login}>Log in with Spotify</button>
		</div>
	);
};
