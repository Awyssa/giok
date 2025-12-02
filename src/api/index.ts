import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import { eq } from "drizzle-orm";

// Initialize drizzle connection
import { db } from "./drizzle";
import { users } from "./db/schema"; // Your users table schema

// Routes
import authRouter from "./routes/auth";

const api = new Elysia({ prefix: "/api" })
	.use(
		jwt({
			name: "jwt",
			secret: process.env.JWT_SECRET,
		})
	)
	.use(cookie())
	.decorate("db", db)
	.derive(async ({ jwt, cookie: { auth } }) => {
		// If no auth cookie, user is null
		if (!auth) {
			return { user: null };
		}

		try {
			// Verify JWT
			const payload = await jwt.verify(auth);

			if (!payload) {
				return { user: null };
			}

			// Option 2: Fetch fresh user data from DB (more secure, always up-to-date)
			const [user] = await db.select().from(users).where(eq(users.id, payload.id)).limit(1);

			return { user: user || null };
		} catch (error) {
			console.error("JWT verification failed:", error);
			return { user: null };
		}
	})
	.get("/", () => "Hello Elysia")
	.use(authRouter)
	.onError(({ code }) => {
		if (code === "NOT_FOUND") {
			return "Route not found :(";
		}
	});

export default api;
