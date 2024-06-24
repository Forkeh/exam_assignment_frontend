import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<header className="flex w-full justify-center gap-8 bg-slate-400 p-3 h-20 items-center mb-5">
			<NavLink
				to={"/"}
				className={({ isActive }) => {
					return `text-xl font-semibold ${isActive ? "text-white" : "text-black"}`;
				}}
			>
				Participants
			</NavLink>
			<NavLink
				to={"/results"}
				className={({ isActive }) => {
					return `text-xl font-semibold ${isActive ? "text-white" : "text-black"}`;
				}}
			>
				Results
			</NavLink>
		</header>
	);
}
