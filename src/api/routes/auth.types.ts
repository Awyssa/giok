import type { RouterContext } from "@/types/api/router";

export type { RouterContext };

export interface SignupBody {
	email: string;
	password: string;
	name: string;
	confirmPassword: string;
}

export interface LoginBody {
	email: string;
	password: string;
}
