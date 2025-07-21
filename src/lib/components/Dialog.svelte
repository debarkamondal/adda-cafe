<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	let { open = $bindable(), children }: { open: boolean; children: Snippet<[]> } = $props();
	let dialog = $state<HTMLDialogElement>();

	let transitionOpen = $state(false);
	$effect(() => {
		transitionOpen = open;
	});
</script>

<dialog
	bind:this={dialog}
	{open}
	class="border-px border-accent-300 bg-primary-950 text-accent-50 relative m-auto rounded-xl border p-4 text-center"
>
	{#if transitionOpen}
		<div transition:fade onoutroend={() => (open = false)}>
			{@render children()}
			<form onsubmit={() => (transitionOpen = false)}>
				<button class="text-accent-400 absolute top-2 right-4" type="submit">X</button>
			</form>
		</div>
	{/if}
</dialog>
