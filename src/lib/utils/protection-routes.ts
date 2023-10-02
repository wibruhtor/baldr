export const protectedRoutes = [
	'/ban-word-filters',
	'/chat-widgets',
	'/sessions',
];
export const protectedRouteIds = protectedRoutes.map(v => `/(app)${v}`);
