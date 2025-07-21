<script lang="ts">
	import AddToCartButton from './AddToCartButton.svelte';
	import type { menuItem } from '../../states/cart.svelte';
	import { fade } from 'svelte/transition';

	let { menu }: { menu?: Array<Omit<menuItem, 'qty'>> } = $props();
	if (!menu) {
		menu = [
			{
				id: 'coffee001',
				title: 'Arabica Coffee Beans',
				image: 'https://example.com/images/arabica.jpg',
				price: 499
			},
			{
				id: 'mug001',
				title: 'Ceramic Coffee Mug',
				image: 'https://example.com/images/mug.jpg',
				price: 199
			},
			{
				id: 'grinder001',
				title: 'Manual Coffee Grinder',
				image: 'https://example.com/images/grinder.jpg',
				price: 1299
			},
			{
				id: 'dripper001',
				title: 'Pour Over Coffee Dripper',
				image: 'https://example.com/images/dripper.jpg',
				price: 799
			},
			{
				id: 'combo001',
				title: 'Starter Coffee Kit',
				image: 'https://example.com/images/starter-kit.jpg',
				price: 1999
			},
			{
				id: 'espresso001',
				title: 'Espresso Machine',
				image: 'https://example.com/images/espresso.jpg',
				price: 5999
			},
			{
				id: 'filter001',
				title: 'Reusable Coffee Filter',
				image: 'https://example.com/images/filter.jpg',
				price: 299
			},
			{
				id: 'thermos001',
				title: 'Vacuum Insulated Thermos',
				image: 'https://example.com/images/thermos.jpg',
				price: 899
			},
			{
				id: 'coffee002',
				title: 'Robusta Coffee Beans',
				image: 'https://example.com/images/robusta.jpg',
				price: 399
			},
			{
				id: 'cup001',
				title: 'Double Wall Glass Cup',
				image: 'https://example.com/images/glass-cup.jpg',
				price: 349
			},
			{
				id: 'syrup001',
				title: 'Vanilla Coffee Syrup',
				image: 'https://example.com/images/vanilla-syrup.jpg',
				price: 249
			},
			{
				id: 'milkfrother001',
				title: 'Electric Milk Frother',
				image: 'https://example.com/images/frother.jpg',
				price: 999
			},
			{
				id: 'blend001',
				title: 'House Blend Ground Coffee',
				image: 'https://example.com/images/blend.jpg',
				price: 449
			},
			{
				id: 'scale001',
				title: 'Digital Coffee Scale',
				image: 'https://example.com/images/scale.jpg',
				price: 699
			},
			{
				id: 'storage001',
				title: 'Airtight Coffee Canister',
				image: 'https://example.com/images/canister.jpg',
				price: 499
			},
			{
				id: 'coldbrew001',
				title: 'Cold Brew Maker',
				image: 'https://example.com/images/coldbrew.jpg',
				price: 1399
			},
			{
				id: 'travelmug001',
				title: 'Spill-Proof Travel Mug',
				image: 'https://example.com/images/travel-mug.jpg',
				price: 599
			},
			{
				id: 'flavored001',
				title: 'Hazelnut Flavored Coffee',
				image: 'https://example.com/images/hazelnut.jpg',
				price: 459
			},
			{
				id: 'capsule001',
				title: 'Coffee Capsules Assorted Pack',
				image: 'https://example.com/images/capsules.jpg',
				price: 749
			},
			{
				id: 'giftbox001',
				title: 'Coffee Gift Box',
				image: 'https://example.com/images/giftbox.jpg',
				price: 1599
			}
		];
	}
</script>

<main class="mx-1 my-4 space-y-2">
	{#each menu as item (item.id)}
		<div transition:fade class="bg-secondary-900 flex gap-4 rounded-md p-2">
			<img src="/tea-cup.jpg" alt="tea cup" class="h-24 rounded-md object-scale-down" />
			<div class="my-2 grow">
				<p class="text-lg font-semibold">{item.title}</p>
				<span class="self-center font-semibold">&#8377;{item.price}</span>
			</div>
			<AddToCartButton item={{ ...item, qty: 0 }} />
		</div>
	{/each}
</main>
