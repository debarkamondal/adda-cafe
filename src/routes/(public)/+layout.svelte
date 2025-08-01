<script lang="ts">
	import '../../app.css';
	import Drawer from '$lib/components/Drawer.svelte';
	import { cart } from '../../states/cart.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import menu from '../../states/menu.svelte';
	import Card from '$lib/components/Card.svelte';
	import { PUBLIC_BACKEND_URL, PUBLIC_BUCKET_URL } from '$env/static/public';
	import { fade, slide } from 'svelte/transition';
	import AddToCartButton from '$lib/components/AddToCartButton.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Button from '$lib/components/Button.svelte';
	import getCookies from '$lib/utils/getCookies';
	import type { order } from '../../../types';

	let { children } = $props();

	let dialogRef = $state<HTMLDialogElement>();
	let transitionOpen = $state<boolean>(false);
	let innerHeight = $state(0);
	let descIndex = $state();
	let note = $state<string>();

	const placeOrder = () => {
		const csrfToken = getCookies('csrf_token');
		if (!csrfToken) throw Error('Unauthorized');
		const payload: Omit<order, 'id' | 'createdAt' | 'sessionId'> = {
			items: cart.items.map((item) => {
				return {
					id: item.id,
					qty: item.qty
				};
			})
		};
		if (note) payload.note = note;
		const res = fetch(`${PUBLIC_BACKEND_URL}/order`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'X-CSRF-TOKEN': csrfToken
			},
			body: JSON.stringify({ note: note, items: payload.items })
		});
		transitionOpen = false;
	};
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
			<div class="m-4 flex items-center justify-between">
				<div class="flex flex-col font-semibold">
					<span
						>Amount:
						<span class="font-bold">&#8377;{cart.getAmount()}</span></span
					>
				</div>
				<Button
					onclick={() => {
						if (!dialogRef) return;
						transitionOpen = true;
						dialogRef.showModal();
					}}>Place Order</Button
				>
			</div>
		</section>
	{/if}
	<h1 class="mx-2 text-3xl font-semibold">Menu</h1>
	<main class="mx-1 my-4 space-y-2">
		{#if menu.items.length > 0}
			{#each menu.items as item, index (item.id)}
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
		{:else}
			<div class="text-primary-700 my-8 text-center text-xl">Empty Menu</div>
		{/if}
	</main>
</Drawer>
<Dialog bind:dialogRef bind:transitionOpen title="Confirm Order">
	<section class="text-center">
		<p class="text-xl font-semibold">Are you sure?</p>
		<p>Order once place can't be cancelled.</p>
		<form onsubmit={placeOrder} class="text-center">
			<input
				type="text"
				id="note"
				bind:value={note}
				class="border-accent-300 bg-accent-50 text-primary-950 focus:border-accent-300 focus:ring-accent-300 my-2 w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:ring-2 focus:outline-none"
				placeholder="Enter any instruction"
			/>
		</form>
		<Button onclick={placeOrder} class="mx-auto mt-4 w-32">Confirm</Button>
	</section>
</Dialog>
