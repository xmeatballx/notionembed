import * as db from '../../../../../lib/_db';
import { Client } from '@notionhq/client';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const GET: RequestHandler = async ({ params, url }: any) => {
	const user = await prismaClient.user.findUnique({
		where: {
			id: params.id
		}
	});
	console.log('USER DB: ', user);
	const notion = new Client({ auth: user?.access_token });
	const cachedDb = await db.get({ key: params.database });
	let database;
	if (!cachedDb) {
		database = await notion.databases.query({ database_id: params.database });
	} else {
		database = cachedDb;
	}
	const pageId = url.searchParams.get('page');
	if (pageId) {
		const cachedPage = await db.get({ key: pageId });
		if (!cachedPage) {
			const page = await notion.pages.retrieve({ page_id: pageId });
			return new Response(JSON.stringify({
				page
			}));
		} else {
			return new Response(JSON.stringify({
				cachedPage
			}));
		}
	}

	return new Response(JSON.stringify({ 
		database
	}));
};
