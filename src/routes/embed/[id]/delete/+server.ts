import type { RequestHandler } from './$types';
import { PrismaClient } from '$lib/prisma';

const prismaClient = new PrismaClient();

export const GET: RequestHandler = async ({ params }: { params: { id: string } }) => {
	const embed = await prismaClient.embed.deleteOne({ where: { id: params.id } });
	return new Response(JSON.stringify({ message: 'success' }));
};

