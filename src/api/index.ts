import { Elysia } from "elysia";

// Routes
import authRouter from "./routes/auth";

const api = new Elysia({ prefix: "/api" })
	.get("/", () => "Hello Elysia")
	.use(authRouter)
	.onError(({ code }) => {
		if (code === "NOT_FOUND") {
			return "Route not found :(";
		}
	});

export default api;
