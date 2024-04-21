import type { RequestHandler } from './$types';
import { PrismaClient, type User } from '@prisma/client';
import type { Block } from 'src/types';

const prismaClient = new PrismaClient();

export const post: RequestHandler = async ({ params, request }: any) => {
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
	return {
		embed
	};
};
