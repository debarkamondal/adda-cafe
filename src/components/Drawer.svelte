<script lang="ts">
	import { onMount } from 'svelte';

	let initCoord = $state(0);
	let innerHeight = $state(0);
	let barCoord = $state(10000);
	const ontouchend = (event: TouchEvent) => {
		const end = event.changedTouches[0].pageY;
		if (initCoord - end > 0) barCoord = innerHeight * 0.1;
		else barCoord = innerHeight - 100;
	};
	const ontouchstart = (event: TouchEvent) => {
		initCoord = event.changedTouches[0].pageY;
	};

	const ontouchmove = (event: TouchEvent) => {
		barCoord = event.changedTouches[0].pageY;
	};
	onMount(() => {
		if (!innerHeight) return;
		barCoord = innerHeight - 100;
	});
</script>

<svelte:window bind:innerHeight />
<section>
	<h1
		class="fixed bottom-0 h-svh w-full bg-red-500"
		ontouchcancel={ontouchend}
		{ontouchmove}
		{ontouchend}
		{ontouchstart}
		style:translate={`0px ${barCoord}px`}
	>
		Test
	</h1>
</section>
