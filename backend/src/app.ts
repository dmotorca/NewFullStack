import Fastify from "fastify";
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import {Message} from "./db/entities/Message.js";
import { AuthPlugin } from "./plugins/auth.js";
import { FastifyBadWordsPlugin } from "./plugins/badwords.js";
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import DoggrRoutes from "./routes/routes.js";
// ***** My Code *****
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


await app.register(multipart);
await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin, {});
await app.register(FastifyBadWordsPlugin);
await app.register(AuthPlugin);
await app.register(DoggrRoutes, {});


// ***** My Code *****
const io = new SocketIOServer(app.server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: "*"
	}
});

// ***** My Code IO STUFF *****
io.on("connection", (socket) => {
	console.log("New client connected");
	
	// Handle socket events
	socket.on("chatMessage", (message) => {
		console.log("Received chat message:", message);
		
		// Broadcast the message to all connected clients
		io.emit("chatMessage", message);
	});
	
	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

// ***** My Code IO STUFF *****

export default app;
