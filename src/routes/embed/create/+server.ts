import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();

export const post: RequestHandler = async ({ request }: any) => {
	const data = JSON.parse(await request.text());
	const {
		userId,
		databaseId,
		pageIds,
		blocks,
		name,
		autoplay,
		autoplayInterval,
		autoplayOrder
	} = data;
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
	return json(embed) 
};
