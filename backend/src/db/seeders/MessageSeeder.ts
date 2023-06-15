import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { Message } from "../entities/Message.js";

export class MessageSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		
		const msgRepo = em.getRepository(Message);
		
		const messages = [
			msgRepo.create({
				sender: context.user1,
				receiver: context.user2,
				message: "Test message 1",
			}),
			msgRepo.create({
				sender: context.user2,
				receiver: context.user1,
				message: "Test message 2",
			}),
			msgRepo.create({
				sender: context.user3,
				receiver: context.user2,
				message: "Test message 3",
			}),
			msgRepo.create({
				sender: context.user1,
				receiver: context.user3,
				message: "Test message 4",
			}),
			msgRepo.create({
				sender: context.user2,
				receiver: context.user3,
				message: "Test message 5",
			}),
			msgRepo.create({
				sender: context.user3,
				receiver: context.user1,
				message: "Test message 6",
			}),
		];
		
		await em.persistAndFlush(messages);
	}
}
