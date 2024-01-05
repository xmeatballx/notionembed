import * as db from '../../../../lib/_db';
import { Client } from '@notionhq/client';
import type { RequestHandler } from '@sveltejs/kit';
import { state } from '../../../../stores';

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const get: RequestHandler = async ({ params, url }) => {
	console.log('PARAMS: ', params);
	const user = await prismaClient.user.findUnique({
		where: {
			id: params.id
		}
	});
	console.log('USER CONTENT: ', user);
	const notion = new Client({ auth: user?.access_token });
	const query = url.searchParams;
	const propertyId = query.get('property_id') ?? '';
	const pageId = query.get('page_id') ?? '';
	console.log(pageId + propertyId);
	const cachedData = await db.get({ key: pageId + propertyId });
	if (!cachedData) {
		let response;
		if (propertyId?.includes('title-')) {
			response = await notion.pages.properties.retrieve({
				page_id: query.get('page_id') ?? '',
				property_id: decodeURIComponent(propertyId.split('-')[0])
			});
		} else {
			const id = propertyId == 'cover' || propertyId == 'icon' ? '' : propertyId;
			response = await notion.pages.properties.retrieve({
				page_id: query.get('page_id') ?? '',
				property_id: id
			});
		}

		await db.set({ key: pageId + propertyId, value: JSON.stringify(response) });

		return {
			status: 200,
			body: response
		};
	} else {
		return {
			status: 200,
			body: JSON.parse(cachedData)
		};
	}
};
