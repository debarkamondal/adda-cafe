export interface ToastData {
	id: string;
	message: string;
	type?: 'success' | 'error' | 'warning' | 'info';
	duration?: number;
	closable?: boolean;
}

class ToastStore {
	private _toasts = $state<ToastData[]>([]);

	get toasts() {
		return this._toasts;
	}

	add(toast: Omit<ToastData, 'id'>) {
		const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
		const newToast: ToastData = {
			id,
			type: 'info',
			duration: 5000,
			closable: true,
			...toast
		};

		// Create a new array to trigger reactivity
		this._toasts = [...this._toasts, newToast];
		return id;
	}

	remove(id: string) {
		// Create a new array to trigger reactivity
		this._toasts = this._toasts.filter((toast) => toast.id !== id);
	}

	clear() {
		this._toasts = [];
	}

	// Convenience methods
	success(message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) {
		return this.add({ message, type: 'success', ...options });
	}

	error(message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) {
		return this.add({ message, type: 'error', ...options });
	}

	warning(message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) {
		return this.add({ message, type: 'warning', ...options });
	}

	info(message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) {
		return this.add({ message, type: 'info', ...options });
	}
}

export const toastStore = new ToastStore();

// Debug helper - remove in production
if (typeof window !== 'undefined') {
	(window as any).toastStore = toastStore;
}
