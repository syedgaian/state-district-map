import React, { SVGProps } from "react";

const TimerResetIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M10 2h4" />
			<path d="M12 14v-4" />
			<path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
			<path d="M9 17H4v5" />
		</svg>
	);
};

export default TimerResetIcon;
