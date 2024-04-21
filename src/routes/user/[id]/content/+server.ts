import * as db from '../../../../lib/_db';
import { Client } from '@notionhq/client';
import type { RequestHandler } from './$types';

import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';

const prismaClient = new PrismaClient();

export async function get({ params, url }: { params: { id: string }; url: any }): RequestHandler {
	const user = await prismaClient.user.findUnique({
		where: {
			id: params.id
		}
	});
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
		return json(response);
	} else {
		const data = JSON.parse(cachedData);
		return json(data);
	}
}
