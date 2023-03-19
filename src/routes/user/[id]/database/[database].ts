import * as db from '../../../../lib/_db';
import { Client } from '@notionhq/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params, url }) => {
	const entry = (await db.get({ key: params.id })) ?? `{ "error": "entry doesn't exist"}`;
	const { access_token } = JSON.parse(entry);
	const notion = new Client({ auth: access_token });
	const database = await notion.databases.query({ database_id: params.database });
	const pageId = url.searchParams.get('page');
	if (pageId) {
		const page = await notion.pages.retrieve({ page_id: pageId });
		return {
			status: 200,
			body: page
		};
	}

	return {
		status: 200,
		body: database
	};
};
