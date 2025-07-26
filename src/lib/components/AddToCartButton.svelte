<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import type { menuItem } from '../../../types';
	import { cart } from '../../states/cart.svelte';
	import Button from './Button.svelte';
	let props: { item: menuItem; class?: ClassValue } = $props();

	let cartQty = $derived.by(() => {
		const tempItem = cart.items.filter((cartItem) => props.item.id === cartItem.id);
		if (!tempItem[0]) return 0;
		return tempItem[0].qty;
	});
</script>

{#if cartQty}
	<div
		class={[
			'bg-accent-600 flex h-8 w-18 cursor-pointer items-center justify-around self-center rounded-md',
			props.class
		]}
	>
		<button onclick={() => cart.decreaseQty(props.item)}>-</button>
		<span> {cartQty} </span>
		<button onclick={() => cart.increaseQty(props.item)}>+</button>
	</div>
{:else}
	<Button class="h-8 w-18 self-center" onclick={() => cart.addItem(props.item)}>Add+</Button>
{/if}
