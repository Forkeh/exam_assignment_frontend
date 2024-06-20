import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="w-full p-3 bg-slate-400 flex justify-center gap-8">
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
