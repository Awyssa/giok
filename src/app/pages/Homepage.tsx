import { useState } from "react";

const Homepage = () => {
	const [count, setCount] = useState({ count: 0 });

	const addCount = () => {
		setCount({ count: count.count + 1 });
	};

	return (
		<div>
			<div>counter</div>
			<div>{count.count}</div>
			<button onClick={addCount}>Add</button>
		</div>
	);
};

export { Homepage };
