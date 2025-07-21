<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import Card from '$lib/components/Card.svelte';
	import { browser } from '$app/environment';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

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
	let status = $state<'connecting' | 'connected' | 'loading' | 'loaded'>('connecting');
	let actions = $state<
		{
			name: string;
			description: string;
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
		const url= PUBLIC_BACKEND_URL.replace('http','ws')
		console.log(url)
		const ws = new WebSocket(url);
		ws.onopen = async () => {
			status = 'connected';
			setTimeout(() => (status = 'loaded'), 2000);
		};
		ws.onmessage = async (event) => {
			const data: Record<string, any> = JSON.parse(event.data);
			delete data.pk;
			delete data.sk;
			console.log(data);
			for (const action in data) {
				actions.push({
					name: action.split(':')[0],
					description: data[action]
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
			{#each actions as action, index (action.name)}
				<div class="border-accent-300 mb-2 overflow-hidden rounded-lg border shadow-sm">
					<button
						onclick={() => handleActionExpansion(index)}
						class="hover:bg-accent-800 focus:bg-accent-800 bg-primary-800 flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-200 focus:outline-none"
					>
						<span class="text-primary-100 font-medium capitalize">{action.name}</span>
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
						<div class="border-accent-200 bg-accent-50 border-t">
							<p transition:slide={{ duration: 400 }} class="text-primary-900 p-4 leading-relaxed">
								{JSON.stringify(action.description)}
							</p>
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</Card>
</section>
