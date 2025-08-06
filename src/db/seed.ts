#!/usr/bin/env bun
import { db } from "./index";
import { users } from "./schema/users";

async function seed() {
	console.log("🌱 Seeding database...");

	try {
		// Create a test user
		const testUser = await db
			.insert(users)
			.values({
				email: "test@example.com",
				username: "testuser",
				passwordHash: "$2b$10$dummy.hash.for.testing", // In real app, use proper bcrypt
				firstName: "Test",
				lastName: "User",
				isEmailVerified: true,
			})
			.returning();

		console.log("✅ Test user created:", testUser[0]);
		console.log("🎉 Database seeded successfully!");
	} catch (error) {
		console.error("❌ Seeding failed:", error);
		process.exit(1);
	}
}

// Run seed if this file is executed directly
if (import.meta.main) {
	seed();
}
