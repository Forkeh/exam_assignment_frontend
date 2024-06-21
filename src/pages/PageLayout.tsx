import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
    return (
        <main>
            <h1 className="text-4xl font-bold text-center my-5">Athletics Meet Manager</h1>
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
