import { browser } from '$app/environment';
import getSession from '$lib/utils/getSession';
import menu from '../../states/menu.svelte';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = async ({ fetch }) => {
	menu.init(fetch);
	if (browser) {
		await getSession();
	}
};
