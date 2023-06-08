export const Home = () => {
	return (
		<div>
			<Title />
			<Subtitle />
		</div>
	);
};

export function Title() {
	return <h1>Omify</h1>;
}

export function Subtitle() {
	return <h3>Omegle Meets Spotify</h3>;
}
