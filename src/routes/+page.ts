import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ url }) => {
	const token = url.searchParams.get('token');
	if (!token) redirect(301, '/reserve');
};
