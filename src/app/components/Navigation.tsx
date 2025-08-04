import { Home, Inbox, BarChart2, Settings } from "react-feather";

const Navigation = () => {
	return (
		<nav className="bg-brand-300 h-[100vh] w-[20%] text-white p-8">
			<a href="/app" className="flex justify-center items-center">
				<img src="/images/logo.svg" alt="logo" className="h-[50px] w-[50px] mr-4" />
				<p className="text-2xl">Giok / 기억</p>
			</a>
			<div className="flex flex-col gap-4 pt-5">
				<div className="border-b-2 border-white flex gap-2 pb-1">
					<Home />
					<p>Home</p>
				</div>
				<div className="border-b-2 border-white flex gap-2 pb-1">
					<Inbox />
					<p>Flashcards</p>
				</div>
				<div className="border-b-2 border-white flex gap-2 pb-1">
					<BarChart2 />
					<p>Stats</p>
				</div>
				<div className="border-b-2 border-white flex gap-2 pb-1">
					<Settings />
					<p>Settings</p>
				</div>
			</div>
		</nav>
	);
};

export { Navigation };
