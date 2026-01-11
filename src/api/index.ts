import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { log } from "@/utils/logger";

// Initialize drizzle and connect to db
import { db } from "./drizzle";
import { users } from "./drizzle/schema";
import { eq } from "drizzle-orm";

// Routes
import authRouter from "./routes/auth";
import htmx from "./routes/htmx";

const api = new Elysia({ prefix: "/api" })
	// .use(rateLimiter)
	// .onRequest(({ rateLimiter, ip, set, status }) => {
	// 	if (rateLimiter.check(ip)) return status(420, "Enhance your calm");
	// })
	.use(cors())
	.decorate("db", db)
	.use(
		jwt({
			name: "jwt",
			secret: process.env.JWT_SECRET!,
		})
	)
	.derive(async ({ db, jwt, cookie: { giokToken } }) => {
		try {
			if (!giokToken) return;

			const auth = await jwt.verify(giokToken.value);

			const profile = await db
				.select({
					id: users.id,
					name: users.name,
					email: users.email,
					createdAt: users.createdAt,
				})
				.from(users)
				.where(eq(users.email, auth.email));

			if (!profile?.length) return;

			return { user: profile[0] };
		} catch (err) {
			log.error("err", err);
			return;
		}
	})
	.get("/", () => "Hello Elysia!!!")
	.use(authRouter)
	.use(htmx)
	.onError(({ code }) => {
		if (code === "NOT_FOUND") {
			return "Route not found :(";
		}
	});

export default api;
