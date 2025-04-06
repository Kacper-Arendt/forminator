import { createRoute } from "@tanstack/react-router";

import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Settings } from "@/features/settings/Settings";
import type { RootRoute } from "@tanstack/react-router";

const SettingsWrapper = () => {
	return (
		<BaseLayout>
			<Settings />
		</BaseLayout>
	);
};
export default (parentRoute: RootRoute) =>
	createRoute({
		path: "/settings",
		component: SettingsWrapper,
		getParentRoute: () => parentRoute,
	});
