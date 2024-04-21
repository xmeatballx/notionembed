import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const get: RequestHandler = async ({ params }: { params: { id: string } }) => {
	const embed = await prismaClient.embed.findUnique({ where: { id: params.id } });
	if (!embed) {
		return new Response(JSON.stringify({
			error: 'embed not found'
		}));
	}
	const blocks = await prismaClient.block.findMany({ where: { staticEmbedId: embed.id } });
	return new Response(JSON.stringify({
		embed,
		blocks
	}));
};
