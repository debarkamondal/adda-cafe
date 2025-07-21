import { browser } from '$app/environment';
import { page } from '$app/state';
import getSession from '$lib/utils/getSession';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	if (browser) {
		const session = await getSession();
		if (window && !session && page.url.pathname !== '/admin/login')
			window.location.href = '/admin/login';
		if (session?.role !== 'admin') window.location.href = '/admin/login';
	}
};
