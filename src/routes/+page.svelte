<script lang="ts">
	import Drawer from '../components/Drawer.svelte';
	import Menu from '../components/Menu.svelte';
	import Orders from '../components/Orders.svelte';
	import { Canvas } from '@threlte/core';
	import TableCanvas from '../components/TableCanvas.svelte';
	import { fade } from 'svelte/transition';
	import { cart } from './cart.svelte';

	let innerHeight = $state(10000);
	let dialog = $state<HTMLDialogElement>();

	const menu = [
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
</script>

<svelte:window bind:outerHeight={innerHeight} />
<section id="main-section" style:margin-bottom={`${innerHeight * 0.12}px`}>
	<h1 transition:fade class="m-8 text-5xl">
		<p>Hi,</p>
		<span class="text-4xl">Dezire</span>
		<p class="my-2 text-xl font-semibold">
			To,
			<span
				class="from-primary-300 to-accent-500 ml-1 bg-gradient-to-r bg-clip-text text-transparent"
			>
				Adda-Cafe
			</span>
		</p>
	</h1>
	<div class="h-72">
		<Canvas>
			<TableCanvas />
		</Canvas>
	</div>
	<Orders />
	<div class="my-4 flex">
		<button class="bg-accent-600 mx-auto h-12 w-48 rounded-md">Pay</button>
	</div>
</section>
<Drawer {innerHeight}>
	{#if cart.items.length}
		<h1 class="mx-2 text-3xl font-semibold">Cart</h1>
		<Menu menu={cart.items} />
		<div class="flex justify-center">
			<button
				class="bg-accent-600 mx-auto my-2 mb-4 h-12 w-48 rounded-md"
				onclick={() => {
					if (!dialog) return;
					dialog.showModal();
				}}>Place Order</button
			>
		</div>
	{/if}
	<h1 class="mx-2 text-3xl font-semibold">Menu</h1>
	<Menu {menu} />
</Drawer>
<dialog
	bind:this={dialog}
	class="border-px border-accent-300 bg-primary-950 text-accent-50 relative m-auto rounded-xl border p-4 text-center"
>
	<h2 class="text-accent-400">Confirm Order</h2>
	<div class="bg-accent-300 my-2 h-px"></div>
	<p>Are you sure?</p>
	<p>Order once place can't be cancelled.</p>
	<form method="dialog">
		<button class="text-accent-400 absolute top-2 right-4">X</button>
	</form>
	<button class="bg-accent-600 mx-auto mt-4 h-12 w-48 rounded-md">Confirm</button>
</dialog>
