import { browser } from '$app/environment';
import { page } from '$app/state';
import getSession from '$lib/utils/getSession';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	if (browser) {
		const isAuthenticated = await getSession();
		if (window && !isAuthenticated && page.url.pathname !== '/reserve')
			window.location.href = '/reserve';
	}
};
