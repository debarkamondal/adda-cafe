<script lang="ts">
	import '../../app.css';
	import Drawer from '$lib/components/Drawer.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import { cart } from '../../states/cart.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	let dialog = $state<HTMLDialogElement>();
	let innerHeight = $state(0);
	let { children } = $props();
</script>

<svelte:head>
	<title>Adda-Café</title>
	<meta name="description" content="A cozy little cafe for Adda" />
</svelte:head>
<svelte:window bind:innerHeight />
<main id="main-section" class="" style:margin-bottom={`${innerHeight * 0.12}px`}>
	<ToastContainer />
	{@render children()}
</main>
<Drawer innerHeight={innerHeight !== 0 ? innerHeight : 10000}>
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
	<Menu />
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
