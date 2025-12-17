import { Outlet } from "react-router-dom";
import Header from "../global/components/Header";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-950">
            <Header />
            <Outlet />
        </div>
    );
};

export default MainLayout;
