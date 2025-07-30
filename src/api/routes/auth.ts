import { Elysia } from "elysia";

const authRouter = new Elysia({ prefix: "/auth" })
	.post("signup", (ctx) => {
		console.log("ctx ===", ctx.body);

		ctx.set.headers["Cookie"] = "Your-secret-cookie-shhhhh";

		if (Math.random() >= 0.5) {
			return "<p>There is an error!</p>";
		}

		return "<p>Signing you in!</p>";
	})
	.post("login", (ctx) => {
		console.log("ctx ===", ctx);

		return {
			success: true,
			user: { id: 1, name: "John" },
		};
	});

export default authRouter;
