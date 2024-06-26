import type { PageServerLoad } from './$types';
import { Client } from '@notionhq/client';
import { updateState } from '_src/stores';
import type { StateValue } from '_src/types';
import { PrismaClient } from '$lib/prisma';

const prismaClient = new PrismaClient();

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
	try {
		console.log('IM IN THE LOAD FUNCTION');
		const user = await prismaClient.user.findUnique({
			where: {
				id: params.id
			}
		});
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
			databases: databases,
			pages: pages.results,
			user_id: user.id
		};
	} catch (error: any) {
		console.log(error.message);
		return { error: error.message };
	}
};
