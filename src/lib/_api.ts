import type { StateValue } from 'src/types';
import { updateState } from '../stores';
// import * as db from './_db'

const base = 'https://api.notion.com';

type Headers = {
	//prettier-ignore
	'Authorization'?: string;
	'Content-Type'?: string;
};

async function auth(
	method: string,
	resource: string,
	headers: Headers,
	data?: Record<string, unknown>
) {
	return await fetch(`${base}/${resource}`, {
		method,
		headers: headers,
		body: JSON.stringify(data)
	});
}

async function getPagesForDatabase(userId: string, databaseId: string) {
	// updateState('database_id', databaseId as StateValue);
	//prettier-ignore
	const resource = `/user/${userId}/database/${databaseId}`
	const response = await fetch(resource, { headers: { Accepts: 'application/json' } });
	const data = await response.json();
	// console.log(data)
	return data.results;
}

async function getPage(userId: string, databaseId: string, pageId: string) {
	// updateState('preview_as_id', pageId as StateValue);
	//prettier-ignore
	const response = await fetch(
		`/user/${userId}/database/${databaseId}/?page=${pageId}`,
		{ headers: { 'Accepts': 'application/json' } }
		);
	return await response.json();
}

async function getPageProperties(userId: string, databaseId: string, pageId: string) {
	const response = await fetch(`/user/${userId}/database/${databaseId}/?page=${pageId}`, {
		headers: { Accepts: 'application/json' }
	});
	const page = await response.json();
	return Object.entries(page.properties);
}

async function getPageImage(userId: string, databaseId: string, pageId: string, type: string) {
	const resource = `/user/${userId}/database/${databaseId}/?page=${pageId}`;
	console.log('RESOURCE', resource);
	const response = await fetch(resource, {
		headers: { Accepts: 'application/json' }
	});
	const page = await response.json();
	// console.log(page)
	if (type == 'cover' && page.cover?.type == 'external') {
		return page.cover.external.url;
	}
	if (type == 'icon' && page.icon?.type == 'emoji') {
		return {
			type: 'emoji',
			icon: page.icon.emoji
		};
	}
}

async function getContent(userId: string, pageId: string, propertyId: string) {
	// console.log(pageId)
	// const cachedData = await db.get({ key: propertyId });
	// if (!cachedData) {
	const response = await fetch(
		`/user/${encodeURIComponent(userId)}/content/?page_id=${pageId}&property_id=${propertyId}`,
		{
			headers: { Accepts: 'application/json' }
		}
	);
	const result = await response.json();
	// await db.set({ key: propertyId, value: result })
	return result;
	// } else {
	// 	return cachedData;
	// }
}

function getTitle(items: any) {
	let title;
	for (const item in items) {
		if (items[item].type == 'title') {
			title = items[item].title[0] ? items[item].title[0].text.content : 'Untitled';
		}
	}
	if (title.length > 30) {
		return title.substring(0, 40) + '...';
	} else {
		return title;
	}
}

async function getEmbed(url: string) {
	try {
		const response = await fetch(url, {
			headers: {
				Accepts: 'text/html'
			}
		});
		return response.text();
	} catch (err) {
		return 'blocked';
	}
}

export {
	auth,
	getPagesForDatabase,
	getPage,
	getTitle,
	getPageProperties,
	getPageImage,
	getContent,
	getEmbed
};
