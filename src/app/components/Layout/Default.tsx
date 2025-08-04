import { Navigation } from "../Navigation";

const DefaultLayout = ({ children }: any) => {
	return (
		<>
			<Navigation />
			{children}
		</>
	);
};

export { DefaultLayout };
