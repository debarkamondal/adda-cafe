<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import { onMount } from 'svelte';
	let html5QrcodeScanner;
	onMount(() => {
		function onScanSuccess(decodedText, decodedResult) {
			// handle the scanned code as you like, for example:
			console.log(`Code matched = ${decodedText}`, decodedResult);
		}

		function onScanFailure(error) {
			// handle scan failure, usually better to ignore and keep scanning.
			// for example:
			// console.warn(`Code scan error = ${error}`);
		}

		html5QrcodeScanner = new Html5QrcodeScanner(
			'reader',
			{ fps: 10, qrbox: { width: 1000, height: 1000 } },
			/* verbose= */ false
		);
		html5QrcodeScanner.render(onScanSuccess, onScanFailure);
	});
</script>

<h1 transition:fade class="m-8 text-5xl">
	<p>Hi,</p>
	<span class="text-4xl">Welcome</span>
	<p class="my-2 text-xl font-semibold">
		To,
		<span
			class="from-primary-300 to-accent-500 ml-1 bg-gradient-to-r bg-clip-text text-transparent"
		>
			Adda-Cafe
		</span>
	</p>
	<div id="reader" class="w-full"></div>
</h1>
