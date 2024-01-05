import * as api from '../../lib/_api';
import type { Load, RequestHandler } from './__types';
import * as db from '../../lib/_db';
import type { UserData } from './types';
// import btoa from 'btoa';
import { PrismaClient, type User } from '@prisma/client';

const prismaClient = new PrismaClient();

export const get: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');
	console.log('CODE: ', code);
	if (code) {
		console.log('CLIENT ID: ', import.meta.env.VITE_NOTION_CLIENT_ID);
		console.log('CLIENT SECRET: ', import.meta.env.VITE_NOTION_CLIENT_SECRET);
		const encoded = Buffer.from(
			`${import.meta.env.VITE_NOTION_CLIENT_ID}:${import.meta.env.VITE_NOTION_CLIENT_SECRET}`
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
			redirect_uri: 'http://localhost:3000/login'
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
			return {
				status: 500,
				error: 'user already exists'
			};
		}
		return {
			status: 200,
			headers: {},
			body: {
				redirectURL: `/user/${user?.id}`,
				user: user
			}
		};
	}

	return {
		status: 200
	};
};
export const ssr = true;
