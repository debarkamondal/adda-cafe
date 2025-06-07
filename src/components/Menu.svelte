<script lang="ts">
	import AddToCartButton from './AddToCartButton.svelte';
	import type { menuItem } from '../routes/cart.svelte';
	import { fade } from 'svelte/transition';

	const { menu }: { menu: Array<Omit<menuItem, 'qty'>> } = $props();
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
