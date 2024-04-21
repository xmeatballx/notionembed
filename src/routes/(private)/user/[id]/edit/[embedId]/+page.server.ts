import type { PageServerLoad } from './$types';
import { Client } from '@notionhq/client';
import { PrismaClient } from '$lib/prisma';

const prismaClient = new PrismaClient();

export async function load({ params }: any): PageServerLoad {
	try {
		const user = await prismaClient.user.findUnique({
			where: {
				id: params.id
			}
		});
		const embed = await prismaClient.embed.findUnique({
			where: {
				id: params.embedId
			},
			include: {
				blocks: true
			}
		});
		console.log('EMBED: ', embed, ' \n END EMBED');
		const notion = new Client({ auth: user?.access_token });
		const response = await notion.search({
			query: '',
			filter: {
				value: 'database',
				property: 'object'
			}
		});
		const databases = response.results;
		const defaultDatabase = databases.filter((db) => db.id == embed?.databaseId)[0];
		const pages = await notion.databases.query({ database_id: defaultDatabase.id });
		console.log('DEFAULT DB: ', defaultDatabase);

		return {
			databases: databases,
			pages: pages.results,
			embed
		};
	} catch (error: any) {
		console.log(error.message);
		return { error: error.message };
	}
}

