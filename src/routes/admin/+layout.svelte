<script lang="ts">
	import '../../app.css';
	import Drawer from '$lib/components/Drawer.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import ProductForm from '$lib/components/ProductForm.svelte';
	import menu from '../../states/menu.svelte';
	import { fade, slide } from 'svelte/transition';
	import { PUBLIC_BUCKET_URL } from '$env/static/public';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';

	let innerHeight = $state(0);
	let transitionOpen = $state(false);
	let descIndex = $state();
	let { children } = $props();
	let dialogRef = $state<HTMLDialogElement>();
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
				dialogRef?.showModal();
				transitionOpen = true;
			}}>Add+</button
		>
	</div>
	<main class="mx-1 my-4 space-y-2">
		{#if menu}
			{#each menu as item, index (item.id)}
				<Card class="bg-secondary-900 grid grid-cols-12 gap-4 rounded-md p-2">
					<img
						src={`${PUBLIC_BUCKET_URL}/menu/${item.image}`}
						alt="tea cup"
						class="col-span-4 size-24 rounded-md"
					/>
					<div class="col-span-6 flex flex-col">
						<span class="text-lg font-semibold">{item.title}</span>
						<span class="font-semibold">&#8377;{item.price}</span>
						<summary
							onclick={() => (descIndex = descIndex === index ? null : index)}
							class="mt-2 list-none"
						>
							{#if descIndex !== index}
								<span transition:fade class="line-clamp-1">
									{item.description}{item.description}{item.description}
								</span>
								<span transition:fade class="text-accent-600 text-sm font-bold">more</span>
							{/if}
							{#if descIndex === index}
								<p transition:slide class="text-sm text-ellipsis">
									{item.description}{item.description}{item.description}{item.description}{item.description}{item.description}{item.description}{item.description}{item.description}{item.description}{item.description}{item.description}
								</p>
							{/if}
						</summary>
					</div>
					<Button class="col-span-2 flex h-12 items-center justify-center self-center text-center"
						><img src="/icons/trash.svg" alt="trash icon" /></Button
					>
				</Card>
			{/each}
		{/if}
	</main>
</Drawer>
<Dialog bind:dialogRef bind:transitionOpen title="Add an item">
	<ProductForm {dialogRef} {transitionOpen} />
</Dialog>
