import { useEffect } from "react";
import { io } from "socket.io-client";

export const Chatroom = () => {
	// some code here
	return (
		<div>
			<p>Hello, welcome to the chatroom!</p>
		</div>
	);
};

function ChatComponent() {
	useEffect(() => {
		// Adjust this URL to point to your server
		const socket = io("http://localhost:3000");
		
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
