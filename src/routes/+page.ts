import type { PageLoad } from './$types';
export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://api.sampleapis.com/futurama/episodes');
	const data = await res.json();
	return { data };
};
