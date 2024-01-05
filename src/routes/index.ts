import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	return {
		status: 200,
		body: {
			value: `${Math.floor(Math.random() * 10)}` as string
		}
	};
};

export const post: RequestHandler = async ({ params }) => {
	// console.log(params);
	// console.log('hi');

	return { status: 200 };
};
