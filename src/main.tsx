import {
	Outlet,
	RouterProvider,
	createRootRoute,
	createRoute,
	createRouter,
	Navigate,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import Header from "./components/Header";

import "./styles.css";
import Main from "@/routes/main";
import reportWebVitals from "./reportWebVitals.ts";
import Settings from "@/routes/settings";

const rootRoute = createRootRoute({
	component: () => (
		<main className="w-[350px] dark bg-background">
			<Header />
			<div className="p-2">
				<Outlet />
			</div>
		</main>
	),
	notFoundComponent: () => <Navigate to="/" />,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Main,
});

const routeTree = rootRoute.addChildren([indexRoute, Settings(rootRoute)]);

const router = createRouter({
	routeTree,
	context: {},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}

reportWebVitals();
