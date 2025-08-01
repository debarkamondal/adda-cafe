import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import getCookies from '$lib/utils/getCookies';
import getSession from '$lib/utils/getSession';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	if (browser) {
		const session = await getSession();
		if (window && !session && page.url.pathname !== '/admin/login')
			window.location.href = '/admin/login';
		if (session?.role !== 'admin') window.location.href = '/admin/login';

		try {
			const csrfToken = getCookies('csrf_token');
			if (!csrfToken) {
				goto('/admin/login');
				return;
			}
			const res = await fetch(`${PUBLIC_BACKEND_URL}/admin/table`, {
				credentials: 'include',
				headers: {
					'X-CSRF-TOKEN': csrfToken
				}
			});
			return {
				tables: await res.json()
			};
		} catch (err) {
			console.log(err);
		}
	}
};
