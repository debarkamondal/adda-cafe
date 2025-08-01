export type sessionInfo = {
	name: string;
	role: string;
};
export type menuItem = {
	id: string;
	title: string;
	image: string;
	price: number;
	qty: number;
	description?: string;
};
export type order = {
	id: string;
	note?: string;
	sessionId: string;
	createdAt: string;
	items: Pick<menuItem, 'id' | 'qty'>[];
};
