<script lang="ts">
	import Orders from '$lib/components/Orders.svelte';
	import { Canvas } from '@threlte/core';
	import TableCanvas from '$lib/components/TableCanvas.svelte';
	import { fade } from 'svelte/transition';
	import session from '../../states/global.svelte';

	let innerHeight = $state(10000);
</script>

<svelte:window bind:outerHeight={innerHeight} />
<h1 transition:fade class="m-8 text-5xl">
	<p>Hi,</p>
	<span class="text-4xl capitalize">{session.name || 'welcome'}</span>
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
