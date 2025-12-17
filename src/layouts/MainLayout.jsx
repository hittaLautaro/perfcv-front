import { Outlet } from "react-router-dom";
import Header from "../global/components/Header";
import Footer from "../global/components/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-950">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
