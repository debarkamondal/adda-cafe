<script lang="ts">
	import '../../app.css';
	import Drawer from '$lib/components/Drawer.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import { cart } from '../../states/cart.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import menu from '../../states/menu.svelte';
	import Card from '$lib/components/Card.svelte';
	import { PUBLIC_BUCKET_URL } from '$env/static/public';
	import { fade, slide } from 'svelte/transition';
	import AddToCartButton from '$lib/components/AddToCartButton.svelte';

	let { children } = $props();

	let dialog = $state<HTMLDialogElement>();
	let innerHeight = $state(0);
	let descIndex = $state();
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
		<section transition:fade>
		<h1 class="m-2 text-3xl font-semibold">Cart</h1>
		{#each cart.items as item, index}
			<Card class="bg-secondary-900 m-1 grid grid-cols-12 gap-4 rounded-md p-2">
				<img
					src={`${PUBLIC_BUCKET_URL}/menu/${item.image}`}
					alt="tea cup"
					class="col-span-4 size-24 rounded-md"
				/>
				<div class="col-span-5 flex flex-col">
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
				<AddToCartButton item={{ ...item, qty: 0 }} />
			</Card>
		{/each}
		<div class="flex justify-center">
			<button
				class="bg-accent-600 mx-auto my-2 mb-4 h-12 w-48 rounded-md"
				onclick={() => {
					if (!dialog) return;
					dialog.showModal();
				}}>Place Order</button
			>
		</div>
		</section>
	{/if}
	<h1 class="mx-2 text-3xl font-semibold">Menu</h1>
	<main class="mx-1 my-4 space-y-2">
		{#if menu}
			{#each menu as item, index (item.id)}
				<Card class="bg-secondary-900 grid grid-cols-12 gap-4 rounded-md p-2">
					<img
						src={`${PUBLIC_BUCKET_URL}/menu/${item.image}`}
						alt="tea cup"
						class="col-span-4 size-24 rounded-md"
					/>
					<div class="col-span-5 flex flex-col">
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
					<AddToCartButton item={{ ...item, qty: 0 }} />
				</Card>
			{/each}
		{/if}
	</main>
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
