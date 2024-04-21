import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient, type User } from '@prisma/client';

const prismaClient = new PrismaClient();

export const get: RequestHandler = async ({ params, request, url }) => {
	const embed = await prismaClient.embed.deleteOne({ where: { id: params.id}});	
	return {
		status: 200
	}
}
