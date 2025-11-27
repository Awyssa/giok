import { Elysia } from "elysia";
import { log } from "@/utils/logger";
import * as z from "zod";

const authRouter = new Elysia({ prefix: "/auth" })
	.post("/signup", (ctx: any) => {
		const { name, email, password, confirmPassword } = ctx.body;

		if (password !== confirmPassword) return "<p>Password and confirm password do not match!</p>";

		// Checking schema
		const User = z.object({
			name: z
				.string()
				.min(3, "Name is too short")
				.max(32, "Name is too long")
				.regex(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces")
				.trim(),
			email: z.string().email("Invalid email address"),
			password: z
				.string()
				.min(8, "Password must be at least 8 characters")
				.max(64, "Password is too long")
				.regex(/[a-z]/, "Password must contain at least one lowercase letter")
				.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
				.regex(/\d/, "Password must contain at least one number")
				.regex(/[@$!%*?&]/, "Password must contain at least one special character")
				.trim(),
		});

		const validUser = User.safeParse({ name, email, password });

		if (validUser.error) {
			const messageArray = validUser.error!.issues.map((issue) => {
				return `<p>${issue.message}</p>`;
			});

			return messageArray.join();
		}

		ctx.set.headers = { Cookie: "Your-secret-cookie-shhhhh" };
		// ctx.set.headers = { "HX-Redirect": "/app" };

		return "<p>Signing you in!</p>";
	})
	.post("/login", (ctx: any) => {
		ctx.set.headers = { Cookie: "Your-secret-cookie-shhhhh" };
		ctx.set.headers = { "HX-Redirect": "/app" };

		return {
			success: true,
			user: { id: 1 },
		};
	})
	.post("/logout", (ctx: any) => {
		ctx.set.headers = { Cookie: "" };
		ctx.set.headers = { "HX-Redirect": "/" };

		log.info("Logging out");

		return {
			success: true,
			user: { id: 1 },
		};
	});

export default authRouter;
