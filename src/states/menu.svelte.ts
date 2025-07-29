import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { menuItem } from '../../types';

class Menu {
	public items = $state<menuItem[]>([]);

	init = async (fetch: (input: RequestInfo | URL) => Promise<Response>) => {
		try {
			const res = await fetch(`${PUBLIC_BACKEND_URL}/menu`);
			const data: Array<any> = await res.json();
			if (data.length > 0) {
				this.items.push(...data);
			}
		} catch (error) {
			console.error(error);
		}
	};
	addItem = (item: Omit<menuItem, 'qty'>) => {
		this.items.push({ ...item, qty: 1 });
	};
	deleteItem = (id: string) => (this.items = this.items.filter((item) => item.id !== id));
}

const menu = new Menu();
export default menu;
