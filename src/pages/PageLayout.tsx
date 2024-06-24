import Header from "@/components/navbar/Header";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
    return (
        <main>
            
            <Header />
            <Navbar />
            <main className="flex justify-center ">
                <div className="w-3/4">
                    <Outlet />
                </div>
            </main>
            <Toaster />
        </main>
    );
}
