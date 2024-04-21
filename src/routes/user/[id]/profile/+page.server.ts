import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const get: RequestHandler = async ({ params }) => {
	const user = await prismaClient.user.findUnique({
		where: {
			id: params.id
		}
	});
	const embeds = await prismaClient.embed.findMany({ where: { forUser: params.id } });
	return {
		status: 200,
		body: {
			user: user,
			embeds: embeds
		}
	};
};
