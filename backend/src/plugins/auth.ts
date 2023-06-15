import dotenv from "dotenv";
dotenv.config();
import {FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest} from "fastify";
import Jwt, {VerifyPayloadType} from "@fastify/jwt";
import fp from "fastify-plugin";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as admin from 'firebase-admin';

declare module 'fastify' {
	interface FastifyRequest {
		// You can easily find the type of this return using intellisense inferral below
		jwtVerify(): Promise<VerifyPayloadType>
	}
	interface FastifyInstance {
		auth(): void,
	}
}

export const AuthPlugin = fp(async function(fastifyApp: FastifyInstance, opts: FastifyPluginOptions) {
	fastifyApp.register(import("@fastify/jwt"), {
		secret: process.env.AUTH_SECRET
	});
	
	fastifyApp.decorate("auth", async function(request: FastifyRequest, reply: FastifyReply) {
		try {
			const token = request.headers.authorization
			const decodedToken = await admin.auth().verifyIdToken(token)
			request.user = decodedToken
		} catch (err) {
			reply.send(err);
		}
	})
})

// Your web app's Firebase configuration
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
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Initialize Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
});
