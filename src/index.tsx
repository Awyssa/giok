import { serve } from "bun";

// React app and API
import app from "./app/index.html";
import api from "./api";

// SSR pages
import homepage from "./pages/homepage.html";
import notFound from "./pages/notFound.html";

// Auth pages
import login from "./pages/auth/login.html";
import signup from "./pages/auth/signup.html";

serve({
	routes: {
		// Serve SSR pages so they can be indexed and SEO friendly
		"/": homepage,
		"/login": login,
		"/signup": signup,

		// Serve the React App for any route starting with /app
		"/app": app,
		"/app/*": app,

		// Single handler that delegates all API requests to Elysia
		"/api": (req: Request) => {
			console.log("Incoming req:", req.url);
			return api.handle(req);
		},
		"/api/*": (req: Request) => {
			console.log("Incoming req:", req.url);
			return api.handle(req);
		},

		// Serve static files
		"/images/*": async (req: Request) => {
			const url = new URL(req.url);
			const filePath = `./src/public${url.pathname}`;
			const file = Bun.file(filePath);
			if (await file.exists()) {
				return new Response(file);
			}
			return new Response("Not Found", { status: 404 });
		},

		// Serve CSS files
		"/styles/*": async (req: Request) => {
			const url = new URL(req.url);
			const filePath = `./src/public${url.pathname}`;
			const file = Bun.file(filePath);
			if (await file.exists()) {
				return new Response(file);
			}
			return new Response("Not Found", { status: 404 });
		},

		// Serve notFound page for all unmatched routes.
		"/*": notFound,
	},

	development: process.env.NODE_ENV !== "production" && {
		hmr: true, // Hot loading
		console: true,
	},

	port: 6969, // Always keep it 69
});
