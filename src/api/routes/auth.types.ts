import type { AppContext } from "@/types/context";

export type { AppContext };

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
