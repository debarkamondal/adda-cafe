<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { fade } from 'svelte/transition';

	let props: { children: Snippet<[]>; class?: ClassValue } = $props();
</script>

<div
	transition:fade
	class={[
		'bg-primary-900 border-accent-200 rounded-xl border p-4  transition-transform',
		props.class
	]}
>
	{@render props.children()}
</div>
