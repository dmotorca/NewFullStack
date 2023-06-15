import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const Chatroom = () => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<string[]>([]);
	const socketRef = useRef<Socket | null>(null);
	
	useEffect(() => {
		// Adjust this URL to point to your server
		socketRef.current = io("http://localhost:5173/messages");
		
		socketRef.current.on("connect", () => {
			console.log("Connected to server");
			
			// Handle incoming chat messages
			socketRef.current?.on("chat", (msg) => {
				// Update your state with the new message
				setMessages((prevMessages) => [...prevMessages, msg]);
			});
		});
		
		// Clean up function
		return () => {
			socketRef.current?.disconnect();
		};
	}, []);
	
	const sendMessage = () => {
		// Emit the 'chat' event with your message
		// Replace with your own socket emit code
		socketRef.current?.emit('chat', message);
		
		// Clear the input field
		setMessage("");
	};
	
	return (
		<div>
			<p>Hello, welcome to the chatroom!</p>
			<input value={message} onChange={(e) => setMessage(e.target.value)} />
			<button onClick={sendMessage}>Send</button>
			<ul>
				{messages.map((msg, index) => <li key={index}>{msg}</li>)}
			</ul>
		</div>
	);
};

