import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

pool.connect((err, client, release) => {
	if (err) {
		console.error("❌ Database connection error:", err.stack);
	} else {
		console.log("✅ Database connected successfully");
		release();
	}
});

export { db, pool };
