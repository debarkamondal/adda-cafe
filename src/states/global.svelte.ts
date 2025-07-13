import type { sessionInfo } from '../../types';

let session = $state<sessionInfo>({
	name: '',
	role: ''
});
export default session;
