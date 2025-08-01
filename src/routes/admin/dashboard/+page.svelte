<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import Card from '$lib/components/Card.svelte';
	import { browser } from '$app/environment';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import Dialog from '$lib/components/Dialog.svelte';
	import { toastStore } from '../../../states/toast.svelte';
	import getCookies from '$lib/utils/getCookies';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import QrDisplay from '$lib/components/QRDisplay.svelte';

	let revokeDialogRef = $state<HTMLDialogElement>();
	let tableDialogRef = $state<HTMLDialogElement>();
	let actionOpened = $state<number | null>(null);
	let tableOpened = $state<number | null>(null);
	let transitionOpen = $state(false);
	let tableTransitionOpen = $state(false);
	let reason = $state('');
	let tableName = $state('');
	let status = $state<'connecting' | 'connected' | 'loading' | 'loaded'>('connecting');
	let actionId = $state<string>();
	let actions = $state<
		{
			type: 'session';
			id: string;
			createdAt: number;
			[key: string]: any;
		}[]
	>([]);

	let { data } = $props();

	const acceptSession = async () => {
		if (!actionId) return toastStore.error('No action selected');
		const csrfToken = getCookies('csrf_token');
		if (!csrfToken) {
			goto('/admin/login');
			return;
		}
		const res = await fetch(`${PUBLIC_BACKEND_URL}/admin/pending`, {
			credentials: 'include',
			method: 'DELETE',
			headers: {
				'X-CSRF-TOKEN': csrfToken
			},
			body: JSON.stringify({
				id: actionId.split(':')[1],
				type: 'session'
			})
		});
		if (res.status === 204) {
			actions = actions.filter((_, id) => id !== actionOpened);
			actionOpened = null;
			transitionOpen = false;
			revokeDialogRef?.close();
			toastStore.success('Session accepted');
		}
	};
	const createTable = async () => {
		const csrfToken = getCookies('csrf_token');
		if (!csrfToken) {
			goto('/admin/login');
			return;
		}
		const res = await fetch(`${PUBLIC_BACKEND_URL}/admin/table/${tableName}`, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'X-CSRF-TOKEN': csrfToken
			}
		});
		if (res.status === 200) {
			tableTransitionOpen = false;
			toastStore.success('Table Created.');
		} else toastStore.error('Something went wrong.');
	};
	const flagPendingSession = async (e: SubmitEvent) => {
		e.preventDefault();
		if (!reason) return toastStore.error('No reason provided');
		if (!actionId) return toastStore.error('No action selected');
		const csrfToken = getCookies('csrf_token');
		if (!csrfToken) {
			goto('/admin/login');
			return;
		}
		const res = await fetch(`${PUBLIC_BACKEND_URL}/admin/pending`, {
			credentials: 'include',
			method: 'PUT',
			headers: {
				'X-CSRF-TOKEN': csrfToken
			},
			body: JSON.stringify({
				id: actionId.split(':')[1],
				type: 'session',
				reason
			})
		});
		if (res.status === 204) {
			actions = actions.filter((_, id) => id !== actionOpened);
			actionOpened = null;
			transitionOpen = false;
			revokeDialogRef?.close();
			toastStore.success('Session flagged');
		}
	};

	const handleActionExpansion = (index: number) => {
		actionOpened = actionOpened === index ? null : index;
	};

	if (browser) {
		let csrfToken = getCookies('csrf_token');
		if (!csrfToken) {
			if (!csrfToken) toastStore.error('Unauthorized. please log in again');
			goto('/admin/login');
		}
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
			'mx-4 my-8 min-h-24',
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
								<div class="text-accent-50 -mx-2 mt-2 flex items-center justify-around gap-2">
									<button
										class="bg-accent-900 rounded-md p-2 px-4"
										onclick={() => {
											actionId = id;
											transitionOpen = true;
											revokeDialogRef?.showModal();
										}}><img alt="trash-icon" src="/icons/trash.svg" class="mb-1" /></button
									>
									<button
										class="bg-accent-600 mx-auto h-12 grow rounded-md p-2 px-4"
										onclick={() => {
											actionId = id;
											acceptSession();
										}}>Accept</button
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
<div class="m-4 flex items-center justify-between">
	<h2 transition:fade class="text-3xl font-semibold">Tables</h2>
	<Button
		class="px-4"
		onclick={() => {
			tableTransitionOpen = true;
			tableDialogRef?.showModal();
		}}>+ Add</Button
	>
</div>
<section class="mx-2 grid grid-cols-2 gap-2">
	{#each data.tables as table, index (index)}
		<Card class="focus:bg-accent-800 hover:bg-accent-800 focus:ring-0 ">
			<button
				class="flex w-full justify-between focus:ring-0"
				aria-label="Expand table card"
				onclick={() => {
					tableOpened = tableOpened === index ? null : index;
				}}
			>
				<h3>Table: {table.title}</h3>
				<svg
					class="text-accent-200 h-5 w-5 transform transition-transform duration-200 {tableOpened ===
					index
						? 'rotate-180'
						: ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
					></path>
				</svg>
			</button>
		</Card>
		{#if tableOpened === index}
			<div transition:slide class="col-span-2 overflow-x-hidden">
				<Card class="flex flex-col space-y-2">
					<h2 class="self-center text-2xl font-semibold underline">Table: {table.title}</h2>
					<QrDisplay class="mb-4 max-w-64 self-center rounded-md" token={table.qrToken} />
					<div class="border-accent-200 rounded-lg border p-4">
						<p class="text-lg text-clip capitalize">
							<span class="font-semibold">Available:</span>
							{table.isAvailable}
						</p>
						<p class="text-lg text-clip capitalize">
							<span class="font-semibold">Created by:</span>
							{table.blame}
						</p>
						<p class="text-lg text-clip capitalize">
							<span class="font-semibold">Updated At:</span>
							{table.updatedAt}
						</p>
					</div>
				</Card>
			</div>
		{/if}
	{/each}
</section>

<Dialog title="Revoke session?" bind:dialogRef={revokeDialogRef} bind:transitionOpen>
	<p class="text-center text-lg font-semibold">Why do you want to revoke session?</p>
	<form onsubmit={flagPendingSession} class="text-center">
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
<Dialog
	title="Create Table"
	bind:dialogRef={tableDialogRef}
	bind:transitionOpen={tableTransitionOpen}
>
	<form onsubmit={createTable} class="text-center">
		<input
			type="text"
			id="reason"
			bind:value={tableName}
			class="border-accent-300 bg-accent-50 text-primary-950 focus:border-accent-300 focus:ring-accent-300 my-2 w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:ring-2 focus:outline-none"
			placeholder="Enter name"
		/>
		<button class="bg-accent-600 mx-auto h-12 grow rounded-md p-2 px-4">Create Table</button>
	</form>
</Dialog>
