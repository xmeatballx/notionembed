import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
import type { Block } from '../../../../types';

const prismaClient = new PrismaClient();

export const POST: RequestHandler = async ({ params, request }: any) => {
	const data = JSON.parse(await request.text());
	const { databaseId, pageIds, blocks, name, autoplay, autoplayInterval, autoplayOrder } =
		data;
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
			autoplayOrder
		}
	});
	await prismaClient.block.deleteMany({
		where: {
			staticEmbedId: params.id
		}
	});
	await Promise.all(
		blocks.map(
			async (newBlock: Block) =>
				await prismaClient.block.create({
					data: { ...newBlock, staticEmbedId: params.id }
				})
		)
	);
	return new Response(JSON.stringify({embed}));
}

