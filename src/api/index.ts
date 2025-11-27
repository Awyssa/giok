import { Elysia } from "elysia";

// Initialize drizzle connection
import { db } from "./drizzle";

// Routes
import authRouter from "./routes/auth";

const api = new Elysia({ prefix: "/api" })
	.decorate("db", db)
	.get("/", () => "Hello Elysia")
	.use(authRouter)
	.onError(({ code }) => {
		if (code === "NOT_FOUND") {
			return "Route not found :(";
		}
	});

export default api;
