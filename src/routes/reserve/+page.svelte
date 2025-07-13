<script lang="ts">
	import { BrowserQRCodeReader } from '@zxing/browser';
	//@ts-ignore
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	import { goto, pushState } from '$app/navigation';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	import getSession from '../../utils/getSession';
	import session from '../../states/global.svelte';
	import { toastStore } from '../../states/toast.svelte';

	let videoElement = $state<HTMLVideoElement>();
	let videoInputDevice = $state<MediaStream>();

	let token = $state<string | null>(page.url.searchParams.get('token'));
	let streaming = $state(false);
	let formData = $state({
		nickname: '',
		phone: null
	});

	const width = 320;
	let height = 0;

	const getDevices = async () => {
		const codeReader = new BrowserQRCodeReader();
		if (!videoElement) return;
		videoInputDevice = await navigator.mediaDevices.getUserMedia({
			video: { facingMode: 'environment' }
		});
		videoElement.srcObject = videoInputDevice;
		const res = await codeReader.decodeOnceFromVideoElement(videoElement);
		const url = new URL(res.getText());
		if (url) {
			token = url.searchParams.get('token') as string;
			pushState('/reserve?token=' + token, page.state);
			videoInputDevice.getTracks().forEach((track) => track.stop());
		}
	};
	const handleCanPlay = () => {
		if (!streaming && videoElement) {
			height = videoElement.videoHeight / (videoElement.videoWidth / width);
			videoElement.setAttribute('width', width.toString());
			videoElement.setAttribute('height', height.toString());
			streaming = true;
		}
	};
	const handleSubmit = async (event: MouseEvent) => {
		event.preventDefault();
		let coords: GeolocationCoordinates;
		if (!token) toastStore.error('Invalid Token please Scan the QR code again.');
		if (typeof formData.nickname !== 'string' || typeof formData.phone !== 'number') {
			toastStore.error('Invalid user input');
			return;
		}
		navigator.geolocation.getCurrentPosition(async (data) => {
			coords = data.coords;
			try {
				const res = await fetch(`${PUBLIC_BACKEND_URL}/reserve`, {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify({
						name: formData.nickname,
						phone: formData.phone,
						token,
						coords: {
							lat: coords.latitude,
							long: coords.longitude
						}
					})
				});
				if (res.status == 200) {
					await getSession();
					if (session.role === 'user') {
						goto('/');
					} else toastStore.error("Couldn't create session");
				}
			} catch (error) {
				console.log(error);
				error = 'Something went wrong. Please try again.';
			}
		});
	};

	$effect(() => {
		if (!token) getDevices();
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
</h1>
{#if !token}
	<span>{token}</span>
	<video bind:this={videoElement} class="mx-auto w-96 p-2" oncanplay={handleCanPlay}>
		<track kind="captions" />
	</video>
{/if}
{#if token}
	<div class="absolute top-0 flex h-full flex-col justify-center gap-4">
		<div class="bg-primary-900 border-accent-200 mx-4 rounded-xl border px-4 py-8">
			<h2 class="text-center text-2xl font-semibold">Reserve Table: {'test'}</h2>
			<form class="my-4 space-y-4 space-x-2">
				<label for="nickname" class="font-semibold">Nickname: </label>
				<input
					class="border-accent-200 border-b"
					id="nickname"
					name="nickname"
					placeholder="Nickname"
					bind:value={formData.nickname}
				/>
				<label for="phone" class="font-semibold">Phone: </label>
				<input
					class="border-accent-200 border-b"
					id="phone"
					name="phone"
					type="number"
					placeholder="Phone number"
					bind:value={formData.phone}
				/>
				<div class="mt-4 flex">
					<button onclick={handleSubmit} class="bg-accent-600 mx-auto h-12 w-48 rounded-md"
						>Submit</button
					>
				</div>
			</form>
		</div>
	</div>
{/if}
