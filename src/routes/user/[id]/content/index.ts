import * as db from '../../../../lib/_db';
import { Client } from '@notionhq/client';
import type { RequestHandler } from '@sveltejs/kit';
import { state } from '../../../../stores';

export const get: RequestHandler = async ({ params, url }) => {
	const entry = (await db.get({ key: params.id })) ?? `{ "error": "entry doesn't exist"}`;
	const { access_token } = JSON.parse(entry);
	const notion = new Client({ auth: access_token });
	const query = url.searchParams;
	const propertyId = query.get("property_id") ?? "";
	const pageId = query.get("page_id") ?? "";
	console.log(pageId+propertyId)
	const cachedData = await db.get({ key: pageId+propertyId})
	if (!cachedData) {
		let response;
		if (propertyId?.includes("title-")) {
			response = await notion.pages.properties.retrieve({
				page_id: query.get('page_id') ?? '',
				property_id: decodeURIComponent(propertyId.split("-")[0])
			});
		} else {
			response = await notion.pages.properties.retrieve({
				page_id: query.get('page_id') ?? '',
				property_id: propertyId ?? ""
			});
		}

		await db.set({ key: pageId+propertyId, value: JSON.stringify(response)})

		return {
			status: 200,
			body: response
		};
	} else {
		return {
			status: 200,
			body: JSON.parse(cachedData)
		}
	}
};
