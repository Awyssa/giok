import type { db } from "@/api/drizzle";
import type { JWTPayloadSpec } from "@elysiajs/jwt";

export type Database = typeof db;

export interface JWTPayload extends JWTPayloadSpec {
	userId: string;
	email: string;
}

export interface AppContext {
	db: Database;
	jwt: {
		sign: (payload: JWTPayload) => Promise<string>;
		verify: (token: string) => Promise<JWTPayload | false>;
	};
	set: {
		status?: number;
		headers: Record<string, string>;
	};
}
