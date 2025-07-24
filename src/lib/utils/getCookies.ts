const getCookies = (cookieName: string) => {
	const cookies = document.cookie;
	let cookie: string | undefined;
	cookies.split(';').some((c) => {
		const [name, value] = c.split('=');
		if (name === cookieName) {
			cookie = value;
			return true;
		}
		return false;
	});
	return cookie;
};
export default getCookies;
