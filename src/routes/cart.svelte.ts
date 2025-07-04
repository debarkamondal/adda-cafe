type menuItem = {
	id: string;
	title: string;
	image: string;
	price: number;
	qty: number;
	description?: string;
};
class Cart {
	public items = $state<menuItem[]>([]);

	addItem = (item: menuItem) => {
		this.items.push({ ...item, qty: 1 });
		window.localStorage.setItem('cart', JSON.stringify(this.items));
	};
	deleteItem = (item: menuItem) => this.items.filter((i) => i.id !== item.id);
	increaseQty = (item: menuItem) => {
		this.items = this.items.map((i) => {
			return i.id === item.id ? { ...i, qty: i.qty + 1 } : i;
		});
		window.localStorage.setItem('cart', JSON.stringify(this.items));
	};
	decreaseQty = (item: menuItem) => {
		let deleteIndex: number | null = null;
		this.items = this.items.map((i, index) => {
			if (i.id !== item.id) return i;
			if (i.qty === 1) deleteIndex = index;
			return { ...i, qty: i.qty - 1 };
		});
		if (deleteIndex !== null) this.items = this.items.filter((_, index) => index !== deleteIndex);
		window.localStorage.setItem('cart', JSON.stringify(this.items));
	};
}

const cart = new Cart();
export { cart, type menuItem };
