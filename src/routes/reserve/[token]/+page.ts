import type { PageLoad } from './$types';

type Params = {
	token: string;
};
export const load: PageLoad = ({ params }: { params: Params }) => {
	return params;
};
