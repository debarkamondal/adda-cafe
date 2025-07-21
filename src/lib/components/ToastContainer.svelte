<script lang="ts">
	import { toastStore } from '../../states/toast.svelte';
	import Toast from './Toast.svelte';

	// Subscribe to toast store
	const toasts = $derived(toastStore.toasts);

	function removeToast(id: string) {
		toastStore.remove(id);
	}
</script>

<div class="fixed top-5 right-5 z-50 flex max-w-md min-w-80 flex-col gap-2">
	{#each toasts as toast (toast.id)}
		<Toast
			id={toast.id}
			message={toast.message}
			type={toast.type}
			duration={toast.duration}
			closable={toast.closable}
			onClose={removeToast}
		/>
	{/each}
</div>

<style>
	@keyframes slide-in {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	:global(.animate-slide-in) {
		animation: slide-in 0.3s ease-out;
	}

	@media (max-width: 480px) {
		.fixed.top-5.right-5 {
			left: 1.25rem;
			right: 1.25rem;
			min-width: auto;
		}
	}
</style>
