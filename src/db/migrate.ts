#!/usr/bin/env bun
import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./index";

async function runMigrations() {
	console.log("🚀 Running database migrations...");

	try {
		await migrate(db, { migrationsFolder: "./drizzle" });
		console.log("✅ Migrations completed successfully!");
	} catch (error) {
		console.error("❌ Migration failed:", error);
		process.exit(1);
	}
}

// Run migrations if this file is executed directly
if (import.meta.main) {
	runMigrations();
}
