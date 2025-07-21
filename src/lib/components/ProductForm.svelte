<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { toastStore } from '../../states/toast.svelte';
	// interface FormData {
	// 	name: string;
	// 	description: string;
	// 	image: File | null;
	// 	price: number;
	// 	inStock: boolean;
	// }

	interface ValidationErrors {
		name?: string;
		description?: string;
		image?: string;
		price?: string;
	}

	let menuItem = $state<{
		name: string;
		description: string;
		image: File | null;
		price: string;
		inStock: boolean;
		imagePreview: string;
		errors: ValidationErrors;
	}>({
		name: '',
		description: '',
		image: null,
		price: '',
		inStock: true,
		imagePreview: '',
		errors: {}
	});

	function validateForm(): boolean {
		const newErrors: ValidationErrors = {};

		if (!menuItem.name.trim()) {
			newErrors.name = 'Name is required';
		}

		if (!menuItem.description.trim()) {
			newErrors.description = 'Description is required';
		}

		if (!menuItem.price || isNaN(parseInt(menuItem.price)) || parseInt(menuItem.price) <= 0) {
			newErrors.price = 'Price must be a valid positive number';
		}

		if (!menuItem.image) {
			newErrors.image = 'Image is required';
		}

		menuItem.errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	function handleImageChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			// Validate file type
			if (!file.type.startsWith('image/')) {
				menuItem.errors = { ...menuItem.errors, image: 'Please select a valid image file' };
				return;
			}

			menuItem.image = file;

			// Create preview
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				menuItem.imagePreview = (e.target?.result as string) || '';
			};
			reader.readAsDataURL(file);

			// Clear image error if it exists
			if (menuItem.errors.image) {
				const { image: _, ...rest } = menuItem.errors;
				menuItem.errors = rest;
			}
		}
	}

	async function handleSubmit(event: SubmitEvent): Promise<void> {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		// const formData: FormData = {
		// 	name: menuItem.name.trim(),
		// 	description: menuItem.description.trim(),
		// 	image: menuItem.image!,
		// 	price: parseInt(menuItem.price),
		// 	inStock: menuItem.inStock
		// };

		try {
			let csrfToken: string = '';
			const cookies = document.cookie;
			cookies.split(';').some((cookie) => {
				const [name, value] = cookie.split('=');
				if (name === 'csrf_token') {
					csrfToken = value;
					return true;
				}
				return false;
			});
			if (csrfToken === '') throw Error('Unauthorized');

			const res = await fetch(`${PUBLIC_BACKEND_URL}/admin/menu`, {
				credentials: 'include',
				headers: {
					'X-CSRF-TOKEN': csrfToken
				},
				method: 'POST',
				body: JSON.stringify({
					title: menuItem.name,
					image: menuItem.image?.name,
					price: parseInt(menuItem.price),
					description: menuItem.description
				})
			});
			const result: {
				id: string;
				url: string;
			} = await res.json();
			await fetch(result.url, {
				method: 'PUT',
				body: menuItem.image,
				headers: { 'Content-Type': menuItem.image?.type as string }
			});
		} catch (error) {
			toastStore.error(`Couldn't create product:${error}`);
		}
	}

	function resetForm(): void {
		menuItem.name = '';
		menuItem.description = '';
		menuItem.image = null;
		menuItem.price = '';
		menuItem.inStock = true;
		menuItem.imagePreview = '';
		menuItem.errors = {};
	}
</script>

<div class="bg-primary-900 mx-auto rounded-xl">
	<div class="rounded-lg p-6 shadow-md">
		<h1 class="my-2 mb-6 text-center text-2xl font-bold">Add New Product</h1>

		<form onsubmit={handleSubmit} class="space-y-6">
			<!-- Name Field -->
			<div>
				<label for="name" class="mb-2 block text-sm font-medium"> Product Name * </label>
				<input
					type="text"
					id="name"
					bind:value={menuItem.name}
					class="border-accent-300 bg-accent-50 text-primary-950 focus:border-accent-300 focus:ring-accent-300 w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:ring-2 focus:outline-none"
					class:border-red-500={menuItem.errors.name}
					placeholder="Enter product name"
				/>
				{#if menuItem.errors.name}
					<p class="mt-1 text-sm text-red-600">{menuItem.errors.name}</p>
				{/if}
			</div>

			<!-- Description Field -->
			<div>
				<label for="description" class="mb-2 block text-sm font-medium"> Description * </label>
				<textarea
					id="description"
					bind:value={menuItem.description}
					rows="4"
					class="border-accent-300 bg-accent-50 text-primary-950 focus:border-accent-300 focus:ring-accent-300 w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:ring-2 focus:outline-none"
					class:border-red-500={menuItem.errors.description}
					placeholder="Enter product description"
				></textarea>
				{#if menuItem.errors.description}
					<p class="mt-1 text-sm text-red-600">{menuItem.errors.description}</p>
				{/if}
			</div>

			<!-- Image Field -->
			<div>
				{#if menuItem.imagePreview}
					<div class="mt-3 flex flex-col items-center">
						<p class="mb-2 self-start text-sm">Preview:</p>
						<img
							src={menuItem.imagePreview}
							alt="Preview"
							class="border-accent-200 size-48 rounded-md border object-cover"
						/>
					</div>
				{/if}
				<label for="image" class="mb-2 block text-sm font-medium"> Product Image * </label>
				<input
					type="file"
					id="image"
					accept="image/*"
					onchange={handleImageChange}
					class="border-accent-300 file:bg-accent-600 hover:file:bg-accent-400 focus:border-accent-300 focus:ring-accent-500 flex w-full justify-center rounded-md border px-3 py-2 shadow-sm transition-colors file:mr-4 file:min-h-10 file:rounded-md file:border-0 file:px-4 file:py-1 file:text-sm file:font-medium focus:ring-2 focus:outline-none"
					class:border-red-500={menuItem.errors.image}
				/>
				{#if menuItem.errors.image}
					<p class="mt-1 text-sm text-red-600">{menuItem.errors.image}</p>
				{/if}
			</div>

			<!-- Price Field -->
			<div>
				<label for="price" class="mb-2 block text-sm font-medium"> Price (&#8377;) * </label>
				<input
					type="number"
					id="price"
					bind:value={menuItem.price}
					min="0"
					class="border-accent-300 bg-accent-50 text-primary-950 focus:border-accent-300 focus:ring-accent-300 w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:ring-2 focus:outline-none"
					class:border-red-500={menuItem.errors.price}
					placeholder="Enter price"
				/>
				{#if menuItem.errors.price}
					<p class="mt-1 text-sm text-red-600">{menuItem.errors.price}</p>
				{/if}
			</div>

			<!-- In Stock Field -->
			<div>
				<div class="flex items-center">
					<input
						type="checkbox"
						id="inStock"
						bind:checked={menuItem.inStock}
						class="border-accent-300 text-accent-600 accent-accent-500 focus:ring-accent-500 h-4 w-4 rounded transition-colors"
					/>
					<label for="inStock" class="ml-2 block text-sm"> In Stock </label>
				</div>
			</div>

			<!-- Submit Buttons -->
			<div class="flex gap-4 pt-4">
				<button
					type="submit"
					class="bg-accent-600 flex-1 rounded-md px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Add Product
				</button>

				<button
					type="button"
					onclick={resetForm}
					class="bg-accent-50 hover:bg-accent-300 focus:ring-accent-500 text-primary-950 flex-1 rounded-md px-4 py-2 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
				>
					Reset Form
				</button>
			</div>
		</form>
	</div>
</div>
