import type { Load, RequestHandler } from '@sveltejs/kit';
import { Client } from '@notionhq/client';
import { state, updateState } from '../../../../../stores.ts';
import type { StateValue } from 'src/types';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const get: RequestHandler = async ({ params }) => {
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
		console.log("EMBED: ",embed," \n END EMBED");
		updateState();
		const notion = new Client({ auth: user?.access_token });
		const response = await notion.search({
			query: '',
			filter: {
				value: 'database',
				property: 'object'
			}
		});
		const databases = response.results;
		const defaultDatabase = databases.filter(db => db.id == embed?.databaseId)[0];
		const pages = await notion.databases.query({ database_id: defaultDatabase.id });
		console.log("DEFAULT DB: ",defaultDatabase);

		return {
			status: 200,
			headers: {
				accept: 'application/json'
			},
			body: {
				databases: databases,
				pages: pages.results,
				embed
			}
		};
	} catch (error: any) {
		console.log(error.message);
		return { status: 500, body: { error: error.message } };
	}
};
