import {
	Navigate,
	Outlet,
	RouterProvider,
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import Header from "./components/Header";

import "./styles.css";
import Main from "@/routes/main";
import Settings from "@/routes/settings";
import { ThemeProvider } from "./features/settings/components/theme-provider.tsx";
import reportWebVitals from "./reportWebVitals.ts";

const rootRoute = createRootRoute({
	component: () => (
		<main className="w-[350px] bg-background">
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
			<ThemeProvider defaultTheme="dark" storageKey="formtripper-theme">
				<RouterProvider router={router} />
			</ThemeProvider>
		</StrictMode>,
	);
}

reportWebVitals();
