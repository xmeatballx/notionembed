import { json, type RequestHandler } from '@sveltejs/kit';
import { prismaClient } from '$lib/_db';
import { Client } from '@notionhq/client';
import type { Filter } from '_src/types';

export const POST: RequestHandler = async ({ params, request, url }: any) => {
    const user = await prismaClient.user.findUnique({
        where: {
            id: params.id
        }
    });
    console.log('PARAMS: ', params);
    console.log(url);
    console.log(params.database);
    const req = await request.json();
    console.log(req);
    const notion = new Client({ auth: user?.access_token });

    const filter = req.filters.reduce(filterComparison, { and: [] });
    console.log(filter);
    const response = await notion.databases.query({
        database_id: params.database,
        filter
    });

    return json(response.results);
};

function filterComparison(acc: any, filter: Filter) {
    const comparison = {
        property: filter.key,
        [filter.accessor]: {
            [filter.comparison]: filter.value
        }
    }
    console.log(comparison);
    acc.and.push(comparison);
    return acc;
}
