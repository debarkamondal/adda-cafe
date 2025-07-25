import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { menuItem } from '../../types';

const menu = $state<menuItem[]>([]);
export default menu;
