import { createRoute } from "@tanstack/react-router";

import type { RootRoute } from "@tanstack/react-router";
import {BaseLayout} from "@/components/layouts/BaseLayout";

const Settings = () => {
	return (
			<BaseLayout height={250}>
			<p className="text-primary">Settings</p>
			</BaseLayout>
	);
};
export default (parentRoute: RootRoute) =>
	createRoute({
		path: "/settings",
		component: Settings,
		getParentRoute: () => parentRoute,
	});
