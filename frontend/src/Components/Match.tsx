import { Profile } from "@/Components/Profile.tsx";
import { ProfileType } from "@/DoggrTypes.ts";
import { useAuth } from "@/Services/Auth.tsx";
import { getNextProfileFromServer } from "@/Services/HttpClient.tsx";
import { MatchService } from "@/Services/MatchService.tsx";
import { PassService } from "@/Services/PassService.tsx";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";


function YourChatComponent() {
	useEffect(() => {
		// Adjust this URL to point to your server
		const socket = io("http://localhost:5173/match");
		
		socket.on("connect", () => {
			console.log("Connected to server");
			
			// Handle incoming chat messages
			socket.on("chat", (msg) => {
				// Update your state with the new message
				console.log("New message: " + msg);
			});
		});
		
		// Clean up function
		return () => {
			socket.disconnect();
		};
	}, []);
	
}
export const Match = () => {
	const [currentProfile, setCurrentProfile] = useState<ProfileType | null>(null);
	
	const auth = useAuth();
	
	const fetchProfile = () => {
		getNextProfileFromServer()
			.then((response) => setCurrentProfile(response))
			.catch((err) => console.log("Error in fetch profile", err));
	};
	
	useEffect(() => {
		fetchProfile();
	}, []);
	
	const onLikeButtonClick = () => {
		if (auth?.user?.uid && currentProfile) {
			MatchService.send(Number(auth.user.uid), Number(currentProfile.id))
				.then(fetchProfile)
				.catch(err => {
					console.error(err);
					fetchProfile();
				});
		}
	};
	
	const onPassButtonClick = () => {
		if (auth?.user?.uid && currentProfile) {
			PassService.send(Number(auth.user.uid), Number(currentProfile.id))
				.then(fetchProfile)
				.catch(err => {
					console.error(err);
					fetchProfile();
				});
		}
	};
	
	const profile = currentProfile && (
		<Profile
			{...currentProfile}
			onLikeButtonClick={onLikeButtonClick}
			onPassButtonClick={onPassButtonClick}
		/>
	);
	
	return (
		<>
			{profile}
		</>
	);
};

