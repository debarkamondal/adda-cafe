<script>
	const orders = {
		served: [
			{
				id: 1,
				title: 'Black Tea',
				price: 15,
				qty: 2
			},
			{
				id: 2,
				title: 'Milk Tea',
				price: 10,
				qty: 2
			},
			{
				id: 3,
				title: 'Green Tea',
				price: 15,
				qty: 2
			},
			{
				id: 4,
				title: 'Oolong Tea',
				price: 20,
				qty: 2
			}
		],
		preparing: [
			{
				id: 1,
				title: 'Black Tea',
				price: 15,
				qty: 2
			},
			{
				id: 2,
				title: 'Milk Tea',
				price: 10,
				qty: 2
			},
			{
				id: 3,
				title: 'Green Tea',
				price: 15,
				qty: 2
			},
			{
				id: 4,
				title: 'Oolong Tea',
				price: 20,
				qty: 2
			}
		]
	};
	let total = $derived.by(() => {
		let temp = 0;
		temp = orders.preparing.reduce((price, item) => (price += item.price * item.qty), 0);
		temp += orders.served.reduce((price, item) => (price += item.price * item.qty), 0);
		return temp;
	});
</script>

<div class="bg-primary-900 border-accent-200 m-2 mx-4 rounded-xl border p-2 px-4">
	<h2 class="text-center text-2xl font-semibold">Orders</h2>
	<div class="bg-accent-200 my-2 h-px"></div>
	<h3 class="col-span-12 my-2 text-lg font-semibold">Preparing</h3>
	<div class="une grid grid-cols-12 font-semibold">
		<span class="col-span-6 ml-2">Item</span>
		<span class="col-span-2 text-right">Price</span>
		<span class="col-span-2 text-right">Qty.</span>
		<span class="col-span-2 text-right">Total</span>
	</div>
	{#each orders.preparing as item, index}
		<div class="grid grid-cols-12">
			<h4 class="col-span-6 ml-2 capitalize">{index + 1}. {item.title}</h4>
			<span class="col-span-2 text-right">&#8377;{item.price}</span>
			<span class="col-span-2 text-right">{item.qty}</span>
			<span class="col-span-2 text-right">&#8377;{item.price * item.qty}</span>
		</div>
	{/each}
	<h3 class="col-span-12 my-2 text-lg font-semibold">Served</h3>
	{#each orders.served as item, index}
		<div class="grid grid-cols-12">
			<h4 class="col-span-6 ml-2 capitalize">{index + 1}. {item.title}</h4>
			<span class="col-span-2 text-right">&#8377;{item.price}</span>
			<span class="col-span-2 text-right">{item.qty}</span>
			<span class="col-span-2 text-right">&#8377;{item.price * item.qty}</span>
		</div>
	{/each}
	<div class="bg-accent-200 my-2 h-px"></div>
	<p class=" flex justify-between text-lg font-semibold">
		<span>Total:</span>
		<span>&#8377;{total}</span>
	</p>
</div>
