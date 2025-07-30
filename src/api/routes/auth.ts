import { Elysia } from "elysia";

const authRouter = new Elysia({ prefix: "/auth" })
	.post("/signup", (ctx: any) => {
		console.log("ctx ===", ctx.body);

		ctx.set.headers = { Cookie: "Your-secret-cookie-shhhhh" };
		ctx.set.headers = { "HX-Redirect": "/app" };

		return "<p>Signing you in!</p>";
	})
	.post("/login", (ctx: any) => {
		console.log("GOT HERE!!!");

		ctx.set.headers = { Cookie: "Your-secret-cookie-shhhhh" };
		ctx.set.headers = { "HX-Redirect": "/app" };

		return {
			success: true,
			user: { id: 1 },
		};
	});

export default authRouter;
