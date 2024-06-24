import Header from "@/components/navbar/Header";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function PageLayout() {
	const location = useLocation();

	return (
		<main>
			<Header />
			<Navbar />
			<main className="flex justify-center">
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					key={location.pathname}
					className="w-3/4"
				>
					<Outlet />
				</motion.div>
			</main>
			<Toaster />
		</main>
	);
}
