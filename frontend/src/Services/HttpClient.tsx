import { ProfileType } from "@/DoggrTypes.ts";
import axios from "axios";

// ****** My Changes ******
import { io } from "socket.io-client";
// ****** My Changes ******

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

// This is why I use Axios over Fetch
export const httpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json",
	},
});


// ****** My Changes ******
//export const chatSocket = io(serverUrl);
// ****** My Changes ******

export async function getNextProfileFromServer() {
	const profile =
		await httpClient.get<ProfileType>("/profile");
	return profile.data;
}
