type menuItem = {
	id: string;
	title: string;
	image: string;
	price: number;
	qty: number;
	description?: string;
};
class Cart {
	public items = $state<menuItem[]>([
		{
			id: 'test',
			title: 'test',
			image: 'test',
			price: 0,
			qty: 0
		}
	]);

	addItem = () => console.log('Item added');
	deleteItem = () => console.log('Item deleted');
}

const cart = new Cart();
export { cart, type menuItem };
