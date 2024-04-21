import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const GET: RequestHandler = async ({ params }: { params: { id: string}}) => {
	const embed = await prismaClient.embed.deleteOne({ where: { id: params.id}});	
	return new Response(JSON.stringify({ message: success}))
}
