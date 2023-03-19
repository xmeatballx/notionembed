import * as db from '../../../../lib/_db';
import { Client } from '@notionhq/client';
import type { RequestHandler } from '@sveltejs/kit';
import { state } from '../../../../stores';

export const get: RequestHandler = async ({ params, url }) => {
	const entry = (await db.get({ key: params.id })) ?? `{ "error": "entry doesn't exist"}`;
	const { access_token } = JSON.parse(entry);
	const notion = new Client({ auth: access_token });
	const query = url.searchParams;
	const response = await notion.pages.properties.retrieve({
		page_id: query.get('page_id') ?? '',
		property_id: query.get('property_id') ?? ''
	});

	return {
		status: 200,
		body: response
	};
};
