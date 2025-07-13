import { PUBLIC_PEM } from '$env/static/public';
import type { sessionInfo } from '../../types';
import session from '../states/global.svelte';
const getSession = async (): Promise<sessionInfo | void> => {
	try {
		const keyString = PUBLIC_PEM.trim();
		const pemHeader = '-----BEGIN PUBLIC KEY-----';
		const pemFooter = '-----END PUBLIC KEY-----';

		let cookies = document.cookie.split(';');
		if (!cookies) return;
		let sessionInfoToken: string = '';
		cookies.some((cookie: string) => {
			cookie = cookie.trim();
			const name = cookie.slice(0, cookie.indexOf('='));
			const value = cookie.slice(cookie.indexOf('=') + 1, cookie.length - 1);
			if (name.trim() == 'session_info') {
				sessionInfoToken = value;
				return true;
			}
			return false;
		});
		if (sessionInfoToken.length < 1) return;

		sessionInfoToken = sessionInfoToken.slice(1, sessionInfoToken.length);
		const [data, signature] = sessionInfoToken.split(',');
		const signBuffer = Uint8Array.from(window.atob(signature), (c) => c.charCodeAt(0));
		const dataBuffer = new TextEncoder().encode(window.atob(data));
		// Ensure the PEM string is valid
		if (!keyString.startsWith(pemHeader) || !keyString.endsWith(pemFooter)) {
			throw new Error('Invalid PEM public key format.');
		}

		// Extract the base64-encoded content
		const pemContents = keyString.substring(pemHeader.length, keyString.length - pemFooter.length);

		// Remove newlines and decode base64
		const base64Encoded = pemContents.replace(/\s/g, ''); // Remove all whitespace
		const binKey = Uint8Array.from(atob(base64Encoded), (c) => c.charCodeAt(0));
		const key = await crypto.subtle.importKey(
			'spki',
			binKey,
			{ name: 'RSA-PSS', hash: 'SHA-256' },
			false,
			['verify']
		);
		const isValid = await crypto.subtle.verify(
			{ name: 'RSA-PSS', saltLength: 32 },
			key,
			signBuffer,
			dataBuffer
		);
		if (isValid) {
			const temp: sessionInfo = JSON.parse(window.atob(data));
			session.name = temp.name;
			session.role = temp.role;
			return temp;
		}
	} catch (error) {
		console.log(error);
		return;
	}
};
export default getSession;
