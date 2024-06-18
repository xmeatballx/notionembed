import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '$lib/prisma';
const prismaClient = new PrismaClient();

export const POST: RequestHandler = async ({ request }: any) => {
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
