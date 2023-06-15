import { CreateProfile } from "@/Components/CreateProfile.tsx";
import { Home } from "@/Components/HomePage.tsx";
import { Login } from "@/Components/Login.tsx";
import { Logout } from "@/Components/Logout.tsx";
import { Match } from "@/Components/Match.tsx";
import { NavBar } from "@/Components/Navigation.tsx";
import { Spotify } from"@/Components/Spotify.tsx";
import { ProfileProps } from "@/Components/Profile.tsx";
import { ProtectedRoute } from "@/Components/ProtectedRoute.tsx";
import { useAuth } from "@/Services/Auth.tsx";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "@css/DoggrStyles.css";
import { Chatroom } from "@/Components/Chat.tsx";

// Inside your DoggrRouter function


export function DoggrRouter() {
	const auth = useAuth();

	const [currentProfile, setCurrentProfile ] = useState<ProfileProps>();

	return (
		<div className={"doggrfancy"}>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/match" element={<ProtectedRoute><Match /></ProtectedRoute>} />
				<Route path="/create" element={<CreateProfile/>}/>
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/spotify" element={<Spotify clientId="your_client_id" redirectUri="your_redirect_uri" />} />
				<Route path="/messages" element={<ProtectedRoute><Chatroom /></ProtectedRoute>} />
			
			</Routes>
		</div>
	);
}

