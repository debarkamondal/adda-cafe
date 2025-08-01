<script lang="ts">
	import QRCode from 'qrcode';
	import type { ClassValue } from 'svelte/elements';

	let { token, class: className }: { token: string; class?: ClassValue } = $props();
	let imgUrl = $state<string>();
</script>

<div
	class="hidden"
	{@attach () => {
		QRCode.toDataURL(`${window.origin}/reserve?token=${token}`).then((data) => (imgUrl = data));
	}}
></div>
{#if imgUrl}
	<img src={imgUrl} class={className} alt="qr" />
{/if}
