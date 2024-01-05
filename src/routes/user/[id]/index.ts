import type { Load, RequestHandler } from '@sveltejs/kit';
import * as db from '../../../lib/_db';
import { Client } from '@notionhq/client';
import { state, updateState } from '../../../stores';
import type { StateValue } from 'src/types';
import { getPage } from '$lib/_api';
import * as api from '../../../lib/_api';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const get: RequestHandler = async ({ params }) => {
	try {
		console.log('IM IN THE LOAD FUNCTION');
		const user = await prismaClient.user.findUnique({
			where: {
				id: params.id
			}
		});
		console.log('USER: ', user, params);
		const notion = new Client({ auth: user?.access_token });
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
	} catch (error: any) {
		console.log(error.message);
		return { status: 500, body: { error: error.message } };
	}
};

export const post: RequestHandler = async ({ params }) => {
	console.log(params);
	return {
		status: 200
	};
};
