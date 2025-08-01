<script lang="ts">
	import { onMount } from 'svelte';

	// Props
	interface Props {
		id: string;
		message: string;
		type?: 'success' | 'error' | 'warning' | 'info';
		duration?: number;
		closable?: boolean;
		onClose: (id: string) => void;
	}

	let { id, message, type = 'info', duration = 5000, closable = true, onClose }: Props = $props();

	// State
	let visible = $state(true);
	let timeoutId: ReturnType<typeof setTimeout>;

	// Auto-hide functionality
	onMount(() => {
		if (duration > 0) {
			timeoutId = setTimeout(() => {
				close();
			}, duration);
		}

		// Cleanup timeout on component destroy
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	});

	function close() {
		visible = false;
		// Small delay to allow animation to complete
		setTimeout(() => {
			onClose(id);
		}, 300);
	}

	// Type-based styling function
	function getToastStyles(toastType: typeof type): string {
		switch (toastType) {
			case 'success':
				return 'bg-green-100 text-green-800 border-l-4 border-green-500';
			case 'error':
				return 'bg-red-100 text-red-800 border-l-4 border-red-500';
			case 'warning':
				return 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500';
			case 'info':
			default:
				return 'bg-blue-100 text-blue-800 border-l-4 border-blue-500';
		}
	}

	// Derived toast styles
	const toastStyles = $derived(getToastStyles(type));

	// Icon mapping
	const iconMap = {
		success: '✓',
		error: '✕',
		warning: '⚠',
		info: 'ℹ'
	} as const;

	const icon = $derived(iconMap[type]);
</script>

{#if visible}
	<div
		class="animate-slide-in z-50 rounded-lg p-4 shadow-lg {toastStyles}"
		role="alert"
		aria-live="polite"
	>
		<div class="flex items-center gap-3">
			<div class="flex-shrink-0 text-lg font-bold">
				{icon}
			</div>
			<div class="flex-1 text-sm leading-relaxed">
				{message}
			</div>
			{#if closable}
				<button
					class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-xl leading-none transition-colors hover:bg-black/10"
					onclick={close}
					aria-label="Close toast"
				>
					×
				</button>
			{/if}
		</div>
	</div>
{/if}
