import * as api from '../../lib/_api';
import type { RequestHandler } from './__types';
import * as db from '../../lib/_db';
import type { UserData } from './types';

export const get: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');
	if (code) {
		const headers = {
			//prettier-ignore
			'Authorization': `Basic ${btoa(
				import.meta.env.VITE_NOTION_CLIENT_ID + ':' + import.meta.env.VITE_NOTION_CLIENT_SECRET
			)}`,
			'Content-Type': 'application/json'
		};
		const data = {
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: 'http://localhost:3000/login'
		};
		const response = await api.auth('post', 'v1/oauth/token', headers, data);
		const userData: UserData = await response.json();
		console.log(userData);
		const entry = {
			key: code,
			value: JSON.stringify(userData)
		};
		await db.set(entry);
		if (response.ok) {
			return {
				status: 200
			};
		} else {
			return {
				status: 200
			};
		}
	}

	return {
		status: 200
	};
};
