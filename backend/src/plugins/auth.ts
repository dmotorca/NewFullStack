import dotenv from "dotenv";
dotenv.config();
import {FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest} from "fastify";
import Jwt, {VerifyPayloadType} from "@fastify/jwt";
import fp from "fastify-plugin";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";




declare module 'fastify' {
	interface FastifyRequest {
		// You can easily find the type of this return using intellisense inferral below
		jwtVerify(): Promise<VerifyPayloadType>
	}
	interface FastifyInstance {
		auth(): void,
	}
}

export const AuthPlugin = fp(async function(app: FastifyInstance, opts: FastifyPluginOptions) {
	app.register(import("@fastify/jwt"), {
		secret: process.env.AUTH_SECRET
	});

	app.decorate("auth", async function(request: FastifyRequest, reply: FastifyReply) {
		try {
			await request.jwtVerify();
		} catch (err) {
			reply.send(err);
		}
	})
})


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	
	apiKey: "AIzaSyD_7xadbCZ244tm0anUpVfGOThiOV6p2GI",
	
	authDomain: "omify-9e68d.firebaseapp.com",
	
	projectId: "omify-9e68d",
	
	storageBucket: "omify-9e68d.appspot.com",
	
	messagingSenderId: "644114590431",
	
	appId: "1:644114590431:web:57bc46f5024dd97738d76a",
	
	measurementId: "G-D1NJEP80JC"
	
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


