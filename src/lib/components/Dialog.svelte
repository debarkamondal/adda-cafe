<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	let {
		dialog = $bindable(),
		children,
		transitionOpen = $bindable()
	}: {
		dialog: HTMLDialogElement | undefined;
		transitionOpen: boolean;
		children: Snippet<[]>;
	} = $props();
</script>

<dialog
	bind:this={dialog}
	class="border-px border-accent-300 bg-primary-950 text-accent-50 m-auto rounded-xl border backdrop:backdrop-blur"
>
	{#if transitionOpen}
		<div transition:fade onoutroend={() => dialog?.close()}>
			{@render children()}
			<form onsubmit={() => (transitionOpen = false)}>
				<button class="text-accent-400 absolute top-2 right-4" type="submit">X</button>
			</form>
		</div>
	{/if}
</dialog>
