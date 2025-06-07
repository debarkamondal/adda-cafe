<script lang="ts">
	let { children, innerHeight } = $props();

	let isExpanded = $state(true);
	let barCoord = $derived.by(() => {
		if (isExpanded) return innerHeight * 0.1;
		else return innerHeight * 0.9;
	});
	let initCoord = $state(0);
	let isMouseDown = $state(false);

	const onmousedown = (event: MouseEvent) => {
		isMouseDown = true;
		initCoord = event.clientY;
	};
	const onmousemove = (event: MouseEvent) => {
		if (isMouseDown) barCoord = event.clientY - 100;
	};
	const onmouseup = (event: MouseEvent | FocusEvent) => {
		if (event instanceof MouseEvent && isMouseDown) {
			let end = 0;
			end = event.clientY;
			if (end - initCoord < 0) isExpanded = true;
			if (end - initCoord > 0) isExpanded = false;
		}
		isMouseDown = false;
	};
	const ontouchstart = (event: TouchEvent) => {
		event.stopPropagation();
		initCoord = event.changedTouches[0].clientY;
	};
	const ontouchmove = (event: TouchEvent) => {
		event.stopPropagation();
		barCoord = event.changedTouches[0].clientY;
	};
	const onscroll = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
	};
	const ontouchend = (event: TouchEvent) => {
		event.preventDefault();
		event.stopPropagation();
		const end = event.changedTouches[0].clientY;
		if (initCoord - end > 50) {
			isExpanded = true;
		}
		if (initCoord - end < -50) {
			isExpanded = false;
		}
	};
	$effect(() => {
		if (isExpanded) barCoord = innerHeight * 0.1;
		else barCoord = innerHeight * 0.9;
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
	class={[
		'bg-background-900 border-accent-200 fixed bottom-0 h-dvh w-full touch-none overscroll-contain rounded-t-4xl border transition-all duration-300'
	]}
	style:translate={`0px ${barCoord}px`}
>
	<div
		{onscroll}
		{ontouchstart}
		{ontouchmove}
		{ontouchend}
		{onmousedown}
		{onmousemove}
		{onmouseup}
		onmouseout={onmouseup}
		onblur={onmouseup}
	>
		<button
			class="my-4 flex w-full cursor-pointer touch-auto flex-col items-center"
			onclick={() => (isExpanded = !isExpanded)}
		>
			<!-- {#if barCoord > innerHeight / 2} -->
			{#if !isExpanded}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-chevron-up-icon lucide-chevron-up animate-bounce"
					><path d="m18 15-6-6-6 6" /></svg
				>
				<p>Swipe Up</p>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-chevron-down-icon lucide-chevron-down animate-bounce"
					><path d="m6 9 6 6 6-6" /></svg
				>
				<p>Swipe Down</p>
			{/if}
		</button>
	</div>
	<div class="h-4/5 touch-pan-y overflow-y-scroll px-2">
		{#if isExpanded}
			{@render children()}
		{/if}
	</div>
</section>
