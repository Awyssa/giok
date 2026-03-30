import type { RouterContext } from "@/types/api/router";
export type { RouterContext };

export interface SignupBody {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface LoginBody {
	email: string;
	password: string;
}
