import type { RequestHandler } from './$types';
import { PrismaClient } from '$lib/prisma';

const prismaClient = new PrismaClient();

export const GET: RequestHandler = async ({ params, url }: { params: { id: string }; url: any }) => {
	const embed = await prismaClient.embed.delete({ where: { id: params.id } });
	const query = url.searchParams;
	const userId = query.get('user_id');
	if (userId) {
		const newEmbeds = await prismaClient.embed.findMany({ where: { forUser: userId } });
		return new Response(JSON.stringify({ message: 'success', embeds: newEmbeds }));
	}
	return new Response(JSON.stringify({ message: 'success' }));
};
