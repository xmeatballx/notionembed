import * as api from '../../lib/_api';
import type { UserData } from './types';
import { PrismaClient, type User } from '@prisma/client';
import type { PageServerLoad } from './$types';

const prismaClient = new PrismaClient();

export async function load({ url }: any): PageServerLoad {
	const code = url.searchParams.get('code');
	if (code) {
		console.log('CLIENT ID: ', import.meta.env.VITE_NOTION_CLIENT_ID);
		console.log('CLIENT SECRET: ', import.meta.env.VITE_NOTION_CLIENT_SECRET);
		const encoded = Buffer.from(
			`${import.meta.env.VITE_NOTION_CLIENT_ID}:${import.meta.env.VITE_NOTION_CLIENT_SECRET
			}`
		).toString('base64');
		const headers = {
			//prettier-ignore
			Accept: "application/json",
			'Content-Type': 'application/json',
			Authorization: `Basic ${encoded}`
		};
		console.log(headers);
		const data = {
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: import.meta.env.VITE_SITE_URL
		};
		console.log(data);
		const response = await api.auth('post', 'v1/oauth/token', headers, data);
		const userData: UserData = await response.json();
		console.log('userData: ', userData);

		console.log('USER DATA: ', userData);
		const duplicateUser = await prismaClient.user.findFirst({
			where: {
				name: userData.owner.user?.name
			}
		});
		let user: User;
		// console.log(duplicateUser)
		if (!duplicateUser) {
			user = await prismaClient.user.create({
				data: {
					bot_id: userData.bot_id,
					access_token: userData.access_token,
					name: userData.owner.user.name
				}
			});
		} else {
			user = await prismaClient.user.update({
				where: {
					id: duplicateUser.id
				},
				data: {
					bot_id: userData.bot_id,
					access_token: userData.access_token
				}
			});
		}
		return {
			redirectURL: `/user/${user?.id}`,
			user: user
		};
	}

	return {
		message: 'success'
	};
}
export const ssr = true;
