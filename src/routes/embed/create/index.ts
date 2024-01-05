import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient, type User } from '@prisma/client';
import type { Block } from 'src/types';

const prismaClient = new PrismaClient();

export const post: RequestHandler = async ({ params, request, url }) => {
	const data = JSON.parse(await request.text());
	const { userId, databaseId, pageIds, blocks, name, autoplay, autoplayInterval, autoplayOrder } =
		data;
	const embed = await prismaClient.embed.create({
		data: {
			user: {
				connect: {
					id: userId
				}
			},
			databaseId,
			pageIds,
			name,
			autoplay,
			autoplayInterval,
			autoplayOrder,
			blocks: {
				create: blocks
			}
		}
	});
	return {
		status: 200,
		body: {
			embed: embed
		}
	};
};
