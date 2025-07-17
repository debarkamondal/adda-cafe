<script lang="ts">
	//@ts-ignore
	import { fade } from 'svelte/transition';
	import { goto  } from '$app/navigation';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	import { toastStore } from '../../../states/toast.svelte';
	import getSession from '../../../utils/getSession';
	import session from '../../../states/global.svelte';


	let formData = $state<{
		username: string | null,
		password: string | null
	}>({
		username: null,
		password: null  ,
	});


	const handleSubmit = async (event: MouseEvent) => {
		event.preventDefault();
		if (typeof formData.username !== 'string' || typeof formData.password !== 'string') {
			toastStore.error('Invalid user input');
			return;
		}
		if ( formData.username.length < 4 ||  formData.password.length < 8) {
			toastStore.error('Invalid user input');
			return;
		}
		try {
			const res = await fetch(`${PUBLIC_BACKEND_URL}/admin/login`, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					username: formData.username,
					password: formData.password,
				})
			});
			if (res.status == 200) {
				await getSession();
				if (session.role === 'admin') {
					goto('/admin/dashboard');
				} else toastStore.error("Couldn't create session");
			}
		} catch (error) {
			console.log(error);
			error = 'Something went wrong. Please try again.';
		}
	};

</script>

<h1 transition:fade class="m-8 text-5xl">
	<p>Hi,</p>
	<span class="text-4xl">Admin</span>
	<p class="my-2 text-xl font-semibold">
		To,
		<span
			class="from-primary-300 to-accent-500 ml-1 bg-gradient-to-r bg-clip-text text-transparent"
		>
			Adda-Cafe
		</span>
	</p>
</h1>
	<div class="absolute top-0 flex h-full flex-col justify-center gap-4">
		<div class="bg-primary-900 border-accent-200 mx-4 rounded-xl border px-4 py-8">
			<h2 class="text-center text-2xl font-semibold">Admin Login</h2>
			<form class="my-4 space-y-4 space-x-2">
				<label for="nickname" class="font-semibold">Username: </label>
				<input
					class="border-accent-200 border-b"
					id="username"
					name="username"
					placeholder="Username"
					bind:value={formData.username}
				/>
				<label for="phone" class="font-semibold">Password: </label>
				<input
					class="border-accent-200 border-b"
					id="password"
					name="password"
					type="password"
					placeholder="Password"
					bind:value={formData.password}
				/>
				<div class="mt-4 flex">
					<button onclick={handleSubmit} class="bg-accent-600 mx-auto h-12 w-48 rounded-md"
						>Submit</button
					>
				</div>
			</form>
		</div>
	</div>
