import { Elysia } from "elysia";
import { log } from "@/utils/logger";
import * as z from "zod";
import { users } from "../drizzle/schema";

interface User {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const authRouter = new Elysia({ prefix: "/auth" })
	.post("/signup", async (ctx: any) => {
		const { db, body } = ctx;

		const { name, email, password, confirmPassword }: User = body;

		if (password !== confirmPassword) return '<p class="error-message">Password and confirm password do not match!</p>';

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
			const errorMessages = validUser.error.issues
				.map((issue) => `<p class="error-message">${issue.message}</p>`)
				.join()
				.replaceAll(",", "");

			const htmlErrorMessage = `<div>${errorMessages}</div>`;

			return htmlErrorMessage;
		}

		// After successful user creation:
		const hashedPassword = await Bun.password.hash(password);

		try {
			const [newUser] = await db
				.insert(users)
				.values({
					name: validUser.data.name,
					email: validUser.data.email,
					password: hashedPassword,
				})
				.returning(); // Get the created user back

			// Generate JWT token with user data
			const token = await jwt.sign({
				id: newUser.id,
				email: newUser.email,
				name: newUser.name,
			});

			// Set the JWT as a cookie
			setCookie("auth", token, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60, // 7 days
				path: "/",
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
			});

			ctx.set.headers = { "HX-Redirect": "/app" };
			return "<p>Signing you in!</p>";
		} catch (err: any) {
			console.log("Error while trying to save new user to db", err);

			if (err.code == "23505") return "<p>This user email already exists</p>";

			return "<p>Cannot create this new user. Please try again</p>";
		}
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
	})
	.get("/auth", async (ctx) => {
		const isLoggedIn = db.return;
	});

export default authRouter;
