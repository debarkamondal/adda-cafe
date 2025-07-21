<script lang="ts">
	import '../../app.css';
	import Drawer from '$lib/components/Drawer.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import ProductForm from '$lib/components/ProductForm.svelte';

	let innerHeight = $state(0);
	let transitionOpen = $state(false);
	let { children } = $props();
	let dialog = $state<HTMLDialogElement>();
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
	<div class="mx-2 flex justify-between">
		<h1 class="mx-2 text-3xl font-semibold">Menu</h1>
		<button
			class="bg-accent-600 flex h-8 w-18 cursor-pointer items-center justify-center rounded-md"
			onclick={() => {
				dialog?.showModal();
				transitionOpen = true;
			}}>Add+</button
		>
	</div>
	<Menu />
</Drawer>
<Dialog bind:dialog bind:transitionOpen>
	<ProductForm />
</Dialog>
