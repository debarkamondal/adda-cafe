import { browser } from '$app/environment';
import { page } from '$app/state';
import getSession from '../utils/getSession';
import type { PageLoad } from './reserve/$types';

export const load: PageLoad = async () => {
	if (browser) {
		const isAuthenticated = await getSession();
		if (window && !isAuthenticated && page.url.pathname !== '/reserve')
			window.location.href = '/reserve';
	}
};
