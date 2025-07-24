<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	let {
		dialogRef = $bindable(),
		children,
		transitionOpen = $bindable(),
		title = 'Title'
	}: {
		title: string;
		dialogRef: HTMLDialogElement | undefined;
		transitionOpen: boolean;
		children: Snippet<[]>;
	} = $props();
	export { title };
</script>

<dialog
	bind:this={dialogRef}
	class="border-px border-accent-300 bg-primary-950 text-accent-50 m-auto min-h-24 min-w-2/3 rounded-xl border p-2 backdrop:backdrop-blur"
>
	{#if transitionOpen}
		<h1 class="my-2 text-center text-2xl font-bold">{title}</h1>
		<div class="bg-accent-600 mx-auto h-1 w-2/3"></div>
		<div class="bg-primary-900 mx-auto rounded-xl">
			<div class="rounded-lg p-6 shadow-md">
				<div transition:fade onoutroend={() => dialogRef?.close()}>
					{@render children()}
					<form onsubmit={() => (transitionOpen = false)}>
						<button class="text-accent-400 absolute top-2 right-4" type="submit">X</button>
					</form>
				</div>
			</div>
		</div>
	{/if}
</dialog>
