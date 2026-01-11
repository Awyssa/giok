import { Navigation } from "../Navigation";

const DefaultLayout = ({ children }: any) => {
	return (
		<div className="flex">
			<Navigation />
			{children}
		</div>
	);
};

export { DefaultLayout };
