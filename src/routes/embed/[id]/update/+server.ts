import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient, type User } from '@prisma/client';
import type { Block } from 'src/types';

const prismaClient = new PrismaClient();

export const post: RequestHandler = async ({ params, request, url }) => {
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
	console.log('PARAM ID: ', params);
	const embed = await prismaClient.embed.update({
		where: {
			id: params.id
		},
		data: {
			databaseId,
			pageIds,
			name,
			autoplay,
			autoplayInterval,
			autoplayOrder,
		}
	});
	await prismaClient.block.deleteMany({ 
		where: {
			staticEmbedId: params.id 
		}
	});
	await Promise.all(blocks.map(async (newBlock: Block) => await prismaClient.block.create({ data: {...newBlock, staticEmbedId: params.id}})));
	return {
		status: 200,
		body: {
			embed: embed
		}
	};
};
