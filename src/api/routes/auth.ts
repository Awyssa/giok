import { Elysia } from "elysia";
import * as z from "zod";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

interface User {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const authRouter = new Elysia({ prefix: "/auth" })
	.post("/signup", async ({ body, db, jwt, set }: any) => {
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

		try {
			const hashedPassword = await Bun.password.hash(password);

			const [newUser] = await db
				.insert(users)
				.values({
					name: validUser.data.name,
					email: validUser.data.email,
					password: hashedPassword,
				})
				.returning();

			const token = await jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1m" });

			set.headers["HX-Redirect"] = "/app";
			set.headers["Set-Cookie"] = `giokToken=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 7}`;

			return "<p>Signing you in!</p>";
		} catch (err: any) {
			if (err.cause?.code === "23505") {
				return `<p class="error-message">This email address is already in use, </br> Please login or use another email address.`;
			}

			return "<p>Cannot create this new user. Please try again or contact support.</p>";
		}
	})
	.post("/login", async ({ body, db, jwt, set }: any) => {
		const hashedPassword = await Bun.password.hash(body.password);

		const profile = await db
			.select({
				id: users.id,
				name: users.name,
				email: users.email,
				createdAt: users.createdAt,
			})
			.from(users)
			.where(eq(users.email, body.email))
			.where(eq(users.password, hashedPassword));

		const token = await jwt.sign({ userId: profile.id, email: profile.email }, process.env.JWT_SECRET, { expiresIn: "1m" });

		set.headers["HX-Redirect"] = "/app";
		set.headers["Set-Cookie"] = `giokToken=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 7}`;

		return profile;
	})
	.get("/logout", ({ set }: any) => {
		set.headers["Set-Cookie"] = `giokToken=""; HttpOnly; Secure; SameSite=Strict; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
		set.headers["HX-Redirect"] = "/";
		return null;
	});

export default authRouter;
