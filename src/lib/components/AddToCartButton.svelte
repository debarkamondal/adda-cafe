<script lang="ts">
	import { cart, type menuItem } from '../../states/cart.svelte';
	const {
		item = { id: 'test', title: 'test', price: 0, image: 'test', qty: 0 }
	}: { item: menuItem } = $props();

	let cartQty = $derived.by(() => {
		const tempItem = cart.items.filter((cartItem) => item.id === cartItem.id);
		if (!tempItem[0]) return 0;
		return tempItem[0].qty;
	});
</script>

{#if cartQty}
	<div
		class="bg-accent-600 flex h-8 w-18 cursor-pointer items-center justify-around self-center rounded-md"
	>
		<button onclick={() => cart.decreaseQty(item)}>-</button>
		<span> {cartQty} </span>
		<button onclick={() => cart.increaseQty(item)}>+</button>
	</div>
{:else}
	<button
		class="bg-accent-600 flex h-8 w-18 cursor-pointer items-center justify-center self-center rounded-md"
		onclick={() => cart.addItem(item)}
	>
		Add+
	</button>
{/if}
