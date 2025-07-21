import { browser } from '$app/environment';
import getSession from '$lib/utils/getSession';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = async () => {
	if (browser) {
		const data = await getSession();
	}
};
