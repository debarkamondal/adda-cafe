<script lang="ts">
	import { fade } from 'svelte/transition';

	let videoSource: HTMLVideoElement | null = null;
	let loading = false;
	const obtainCamera = async () => {
		try {
			loading = true;
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true
			});
			console.log(stream);
			if (!videoSource) return;
			videoSource.srcObject = stream;
			videoSource.play();
			loading = false;
		} catch (error) {
			console.log(error);
		}
	};
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
</h1>
<div>
	{#if loading}
		<h1>LOADING</h1>
	{/if}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={videoSource}></video>
	<button on:click={obtainCamera}>CLICK</button>
</div>
