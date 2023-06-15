import Fastify from "fastify";
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import {Message} from "./db/entities/Message.js";
import { AuthPlugin } from "./plugins/auth.js";
import { FastifyBadWordsPlugin } from "./plugins/badwords.js";
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import DoggrRoutes from "./routes/routes.js";
import { Server } from "http";

// ****import { Server } from "http";
// import { Server as SocketIOServer } from "socket.io";
// import Fastify from "fastify";* My Code *****
import { Server as SocketIOServer} from 'socket.io';
import { createServer } from 'http';
// ***** My Code *****
import config from "./db/mikro-orm.config.js";

const envToLogger = {
	development: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
		level: "debug",
	},
	production: {
		level: "error"
	},
	test: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
		level: "warn"
	},
};

const app = Fastify({
	logger: envToLogger[process.env.NODE_ENV]
});

await app.register(cors, {
	origin: (origin, cb) => {
		cb(null, true);
	},
	methods: ['GET','POST','PUT','DELETE','PATCH','SEARCH'],
});


// ***** My Code *****
await app.register(cors, {
	origin: "*",
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	allowedHeaders: '*',
});
// ***** My Code *****
const server = new Server(app.server);

// Initialize a new Socket.IO server and attach it to the HTTP server.
const io = new SocketIOServer(server, {
	cors: {
		origin: "*", // adjust this to match your CORS needs
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
	},
});

io.on("connection", (socket) => {
	console.log("a user connected");
	
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
	
	// Handle chat event
	socket.on("chat", (msg) => {
		// Broadcast the message to all other clients
		socket.broadcast.emit("chat", msg);
	});
});

// After setting up the routes and everything, instead of calling `app.listen()`,
// you call `server.listen()` to start listening for both HTTP requests and websocket connections.
server.listen(3000, () => console.log("Server is running on port 3000"));

await app.register(multipart);
await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin, {});
await app.register(FastifyBadWordsPlugin);
await app.register(AuthPlugin);
await app.register(DoggrRoutes, {});


// ***** My Code *****
// ***** My Code IO STUFF *****

export default app;
