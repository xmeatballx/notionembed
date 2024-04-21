import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient, type User } from '@prisma/client';

const prismaClient = new PrismaClient();

export const get: RequestHandler = async ({ params, url }) => {
	const embed = await prismaClient.embed.findUnique({ where: { id: params.id } });
	if (!embed) {
		return {
			status: 500,
			error: 'embed not found'
		};
	}
	const blocks = await prismaClient.block.findMany({ where: { staticEmbedId: embed.id } });
	return {
		status: 200,
		body: {
			embed,
			blocks
		}
	};
};

export const del: RequestHandler = async ({ params }) => {
	await prismaClient.embed.delete({ where: { id: params.id } });

	try {
		return {
			status: 200,
			body: {
				message: 'delete successful'
			}
		};
	} catch (error: any) {
		return {
			status: 500,
			body: {
				error: error.message ?? 'something went wrong'
			}
		};
	}
};
