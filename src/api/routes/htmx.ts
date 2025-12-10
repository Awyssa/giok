import { Elysia } from "elysia";

const htmxRouter = new Elysia({ prefix: "/htmx" }).get("/nav-buttons", async ({ user }: any) => {
	console.log("user", user);
	if (user) {
		return `
			<div class="flex items-center gap-8">
      <span>Welcome, ${user.name}</span>
      	<button 
					class="cursor-pointer bg-white text-black py-2 px-4 rounded-xl" 
					hx-get="/api/auth/logout" 
					hx-trigger="click"
				>
        	Logout
      	</button>
    	</div>`;
	}

	return `
			<div class="flex items-center gap-8">
				<button class="cursor-pointer">
					<a href="/login">Login</a>
				</button>
				<button class="cursor-pointer bg-white text-black py-2 px-4 rounded-xl">
					<a href="/signup">Get started</a>
				</button>
			</div>
			`;
});

export default htmxRouter;
