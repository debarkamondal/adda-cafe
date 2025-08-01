<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLButtonAttributes } from 'svelte/elements';

	let {
		children,
		class: className,
		...attrs
	}: { children?: Snippet; class?: ClassValue } & HTMLButtonAttributes = $props();
</script>

<button
	class={[
		'bg-accent-600 hover:bg-accent-400 flex h-10 cursor-pointer items-center justify-center rounded-md p-2',
		className
	]}
	{...attrs}
>
	{#if children}
		{@render children()}
	{/if}
</button>
