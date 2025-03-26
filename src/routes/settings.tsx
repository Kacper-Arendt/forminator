import { createRoute } from "@tanstack/react-router";

import type { RootRoute } from "@tanstack/react-router";

const Settings = () => {
	return (
		<>
			<p>Settings</p>
		</>
	);
};
export default (parentRoute: RootRoute) =>
	createRoute({
		path: "/settings",
		component: Settings,
		getParentRoute: () => parentRoute,
	});
