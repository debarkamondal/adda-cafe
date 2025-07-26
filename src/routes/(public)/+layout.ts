import { browser } from '$app/environment';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import getSession from '$lib/utils/getSession';
import menu from '../../states/menu.svelte';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = async () => {
	const res = await fetch(`${PUBLIC_BACKEND_URL}/menu`);
	menu.push(...(await res.json()));
	if (browser) {
		await getSession();
	}
};
