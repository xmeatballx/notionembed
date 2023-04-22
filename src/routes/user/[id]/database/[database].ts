import * as db from '../../../../lib/_db';
import { Client } from '@notionhq/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params, url }) => {
	const entry = (await db.get({ key: params.id })) ?? `{ "error": "entry doesn't exist"}`;
	const { access_token } = JSON.parse(entry);
	const notion = new Client({ auth: access_token });
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
			return {
				status: 200,
				body: page
			};
		} else {
			return {
				status: 200,
				body: cachedPage
			}
		}
	}

	return {
		status: 200,
		body: database
	};
};
