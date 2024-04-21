import type { PageServerLoad } from './$types';
import { PrismaClient } from '$lib/prisma';

const prismaClient = new PrismaClient();

export async function load({ params }: { params: { id: string } }): PageServerLoad {
	const user = await prismaClient.user.findUnique({
		where: {
			id: params.id
		}
	});
	const embeds = await prismaClient.embed.findMany({ where: { forUser: params.id } });
	return {
		user: user,
		embeds: embeds
	};
}

