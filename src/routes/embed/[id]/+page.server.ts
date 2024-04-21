import type { PageServerLoad } from './$types';
import { PrismaClient } from '$lib/prisma';

const prismaClient = new PrismaClient();

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
	const embed = await prismaClient.embed.findUnique({ where: { id: params.id } });
	if (!embed) {
		return {
			error: 'embed not found'
		};
	}
	const blocks = await prismaClient.block.findMany({ where: { staticEmbedId: embed.id } });
	return {
		embed,
		blocks
	};
};
