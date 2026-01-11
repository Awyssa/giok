import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Home, Inbox, BarChart2, Settings } from "react-feather";

type NavigationItem = {
	icon: ReactNode;
	text: string;
	handleOnClick: () => void;
};

const NavigationButton = ({ icon, text, handleOnClick }: NavigationItem) => {
	return (
		<div className="border-b-2 border-white flex gap-2 pb-1">
			<button onClick={handleOnClick}>
				{icon}
				<p>{text}</p>
			</button>
		</div>
	);
};

const Navigation = () => {
	const navigate = useNavigate();
	const navigationConfig: NavigationItem[] = [
		{
			icon: <Home />,
			text: "Home",
			handleOnClick: () => navigate({ to: "/" }),
		},
		{
			icon: <Inbox />,
			text: "Flashcards",
			handleOnClick: () => navigate({ to: "/flashcards" }),
		},
		{
			icon: <BarChart2 />,
			text: "Stats",
			handleOnClick: () => navigate({ to: "/stats" }),
		},
		{
			icon: <Settings />,
			text: "Settings",
			handleOnClick: () => navigate({ to: "/settings" }),
		},
	];

	return (
		<nav className="bg-brand-300 h-[100vh] w-[20%] min-w-[240px] text-white p-8">
			<a href="/app" className="flex justify-center items-center">
				<img src="/images/logo.svg" alt="logo" className="h-[50px] w-[50px] mr-4" />
				<p className="text-2xl">Giok / 기억</p>
			</a>
			<div className="flex flex-col gap-4 pt-5">
				{navigationConfig.map((item) => (
					<NavigationButton key={item.text} icon={item.icon} text={item.text} handleOnClick={item.handleOnClick} />
				))}
			</div>
		</nav>
	);
};

export { Navigation };
