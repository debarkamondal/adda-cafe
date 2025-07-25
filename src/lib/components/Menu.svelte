<script lang="ts">
	import type { menuItem } from '../../../types';
	import AddToCartButton from './AddToCartButton.svelte';
	import { fade } from 'svelte/transition';
	import { PUBLIC_BUCKET_URL } from '$env/static/public';

	let { menu }: { menu?: Array<Omit<menuItem, 'qty'>> } = $props();
</script>

<main class="mx-1 my-4 space-y-2">
	{#if menu}
		{#each menu as item (item.id)}
			<div transition:fade class="bg-secondary-900 flex gap-4 rounded-md p-2">
				<img src={`${PUBLIC_BUCKET_URL}/menu/${item.image}`} alt="tea cup" class="h-24 rounded-md object-scale-down" />
				<div class="my-2 grow">
					<p class="text-lg font-semibold">{item.title}</p>
					<span class="self-center font-semibold">&#8377;{item.price}</span>
				</div>
				<AddToCartButton item={{ ...item, qty: 0 }} />
			</div>
		{/each}
	{/if}
</main>
