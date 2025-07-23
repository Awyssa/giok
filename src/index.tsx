import { serve } from "bun";

// React app and API 
import app from "./app/index.html";
import api from "./api"

// SSR pages
import homepage from "./pages/homepage.html"
import notFound from "./pages/notFound.html"

const server = serve({
  routes: {
    // Serve SSR pages so they can be indexed and SEO friendly
    "/": homepage,

    // Serve the React App for any route starting with /app
    "/app": app,
    "/app/*": app,

    // Single handler that delegates all API requests to Elysia
    "/api": (req) => api.handle(req),
    "/api/*": (req) => {
      console.log("Incoming req:", req.url)
      return api.handle(req)}
      ,

    // Serve notFound page for all unmatched routes.
    "/*": notFound,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
  port: 3000,
});