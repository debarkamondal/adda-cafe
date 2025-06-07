<script lang="ts">
	import Drawer from '../components/Drawer.svelte';
	import Menu from '../components/Menu.svelte';
	import Orders from '../components/Orders.svelte';
	import { Canvas } from '@threlte/core';
	import TableCanvas from '../components/TableCanvas.svelte';
	import { fade } from 'svelte/transition';

	let innerHeight = $state(10000);
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
	<h1 class="mx-2 text-3xl font-semibold">Orders</h1>
	<Menu />
	<h1 class="mx-2 text-3xl font-semibold">Menu</h1>
	<Menu />
</Drawer>
