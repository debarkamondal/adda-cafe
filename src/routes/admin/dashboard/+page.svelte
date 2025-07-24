<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import Card from '$lib/components/Card.svelte';
	import { browser } from '$app/environment';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import Dialog from '$lib/components/Dialog.svelte';

	// let actions = $state([
	// 	{
	// 		name: 'Order 1',
	// 		description: 'description 1'
	// 	},
	// 	{
	// 		name: 'Order 2',
	// 		description: 'description 2'
	// 	}
	// ]);
	let dialogRef = $state<HTMLDialogElement>();
	let transitionOpen = $state(false);
	let reason = $state('');
	let status = $state<'connecting' | 'connected' | 'loading' | 'loaded'>('connecting');
	let actions = $state<
		{
			type: 'session';
			id: string;
			createdAt: number;
			[key: string]: any;
		}[]
	>([]);

	let actionOpened = $state();
	const handleActionExpansion = (index: number) => {
		actionOpened = actionOpened === index ? null : index;
	};

	if (browser) {
		let cookies = document.cookie.split(';');
		let csrfToken: string = '';
		cookies.some((cookie: string) => {
			cookie = cookie.trim();
			const name = cookie.slice(0, cookie.indexOf('='));
			const value = cookie.slice(cookie.indexOf('=') + 1, cookie.length);
			if (name.trim() == 'csrf_token') {
				csrfToken = value;
				return true;
			}
			return false;
		});
		const url = PUBLIC_BACKEND_URL.replace('http', 'ws') + `/admin/ws?X-CSRF-TOKEN=${csrfToken}`;
		const ws = new WebSocket(url);
		ws.onopen = async () => {
			status = 'connected';
			setTimeout(() => (status = 'loaded'), 2000);
		};
		ws.onmessage = async (event) => {
			const data: Record<string, any> = JSON.parse(event.data);
			for (const action in data) {
				actions.push({
					type: data[action].type,
					id: data[action].id,
					...data[action]
				});
			}
		};
	}
</script>

<section>
	<h1 transition:fade class="m-4 mt-16 text-4xl font-semibold">Dashboard</h1>
	<Card
		class={[
			'my-8 min-h-24',
			actions?.length < 1
				? 'text-primary-700 flex items-center justify-center border-dashed'
				: 'items-left block'
		]}
	>
		{#if actions?.length < 1}
			{#if status === 'connecting'}
				<h2 class="font-medium">Connecting...</h2>
			{/if}
			{#if status === 'connected'}
				<h2 class="font-medium">Fetching pending actions...</h2>
			{/if}
			{#if status === 'loaded'}
				<h2 class="font-medium">No pending actions.</h2>
			{/if}
		{:else}
			<h2 class="mb-4 text-center text-lg font-medium underline underline-offset-1">
				Pending actions
			</h2>
			{#each actions as action: Record<string,any>, index (action.id)}
				<div class="border-accent-300 mb-2 overflow-hidden rounded-lg border shadow-sm">
					<button
						onclick={() => handleActionExpansion(index)}
						class="hover:bg-accent-800 focus:bg-accent-800 bg-primary-800 flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-200 focus:outline-none"
					>
						{#if action.type === 'session'}
							<span class="text-primary-100 font-medium capitalize"
								>Reserved Table: {action['tableId']}</span
							>
						{/if}
						<svg
							class="text-accent-200 h-5 w-5 transform transition-transform duration-200 {actionOpened ===
							index
								? 'rotate-180'
								: ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					</button>
					{#if actionOpened === index}
						{@const { id, type, createdAt, ...keys } = action}
						{@const date = new Date(createdAt)}
						<div class="border-accent-200 bg-accent-50 border-t">
							<div
								transition:slide={{ duration: 400 }}
								class="text-primary-900 p-4 leading-relaxed"
							>
								{#each Object.keys(keys) as key}
									<p>
										<span class="font-semibold capitalize">{key}:</span>
										<span class="capitalize">{keys[key]}</span>
									</p>
								{/each}
								<p class="flex flex-col">
									<span
										><span class="mr-1 font-semibold">CreatedAt: </span>{date.toLocaleTimeString()}
										({date.getDate()}/{date.getMonth()}/{date.getFullYear()})</span
									>
									<span><span class="mr-1 font-semibold">Id:</span>{id}</span>
								</p>
								<div class="text-accent-50 -mx-2 mt-2 flex justify-around gap-2">
									<button
										class="bg-accent-900 mx-auto h-12 rounded-md p-2 px-4"
										onclick={() => {
											dialogRef?.showModal();
											transitionOpen = true;
										}}><img alt="trash-icon" src="/icons/trash.svg" /></button
									>
									<button class="bg-accent-600 mx-auto h-12 grow rounded-md p-2 px-4">Accept</button
									>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</Card>
</section>
<Dialog title="Revoke session?" bind:dialogRef bind:transitionOpen>
	<p class="text-center text-lg font-semibold">Why do you want to revoke session?</p>
	<form class="text-center">
		<input
			type="text"
			id="reason"
			bind:value={reason}
			class="border-accent-300 bg-accent-50 text-primary-950 focus:border-accent-300 focus:ring-accent-300 my-2 w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:ring-2 focus:outline-none"
			placeholder="Enter reason"
		/>
		<button class="bg-accent-600 mx-auto h-12 grow rounded-md p-2 px-4">Revoke Session</button>
	</form>
</Dialog>
