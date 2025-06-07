<script lang="ts">
	import { cart, type menuItem } from '../routes/cart.svelte';
	const { item }: { item: menuItem } = $props();
</script>

{#if item.qty}
	<div
		class="bg-accent-600 flex h-8 w-18 cursor-pointer items-center justify-around self-center rounded-md"
	>
		<button>-</button>
		<span> {cart.items[0].qty} </span>
		<button>+</button>
	</div>
{:else}
	<div
		class="bg-accent-600 flex h-8 w-18 cursor-pointer items-center justify-center self-center rounded-md"
	>
		Add+
	</div>
{/if}
