import type { RequestHandler } from '@sveltejs/kit';
import * as db from '../../../lib/_db';
import { Client } from '@notionhq/client';
import { state, updateState } from '../../../stores';
import type { StateValue } from 'src/types';
import { getPage } from '$lib/_api';
import * as api from '../../../lib/_api';

export const get: RequestHandler = async ({ params }) => {
	const entry = (await db.get({ key: params.id })) ?? `{ "error": "entry doesn't exist"}`;
	const { access_token } = JSON.parse(entry);
	const notion = new Client({ auth: access_token });
	const response = await notion.search({
		query: '',
		filter: {
			value: 'database',
			property: 'object'
		}
	});
	const databases = response.results;
	const defaultDatabase = databases[0];
	const pages = await notion.databases.query({ database_id: defaultDatabase.id });
	const defaultPage = pages.results[0];
	const { properties } = defaultPage as any;

	updateState('user_id', params.id as StateValue);
	updateState('page_properties', properties as StateValue);
	updateState('database_id', defaultDatabase.id as StateValue);
	updateState('preview_as_id', defaultPage.id as StateValue);

	return {
		status: 200,
		headers: {
			accept: 'application/json'
		},
		body: {
			databases: databases,
			pages: pages.results
		}
	};
};

export const post: RequestHandler = async ({ params }) => {
	console.log(params);
	return {
		status: 200
	};
};
