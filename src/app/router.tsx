import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import { Homepage } from "./pages/Homepage";

const rootRoute = createRootRoute({
	component: () => <Outlet />,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Homepage,
});

const routeTree = rootRoute.addChildren([indexRoute]);

export const router = createRouter({
	routeTree,
	basepath: "/app",
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
