import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FileText, LogOut, ShoppingCart, User } from "lucide-react";
import logo from "../../assets/PERFCV_LOGO.svg";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-zinc-950 z-50 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center mt-2 ">
        <div className="flex space-x-8 items-center">
          <NavLink
            to="/"
            className="flex items-center gap-2 group"
          >
            <img src={logo} alt="PerfCV Logo" className="h-10 w-auto" />
          </NavLink>
        </div>

        <div className="flex space-x-3 pb-1 items-center">
          {isAuthenticated ? (
            <>
              <NavLink
                to={"/templates"}
                className="flex items-center gap-2 duration-150 text-md px-5 py-2 font-sans text-zinc-400"
              >
                <FileText size={15} />
                Resume templates
              </NavLink>
              <NavLink
                to={"/account"}
                className="flex items-center gap-2 duration-150 text-md px-5 py-2 font-sans text-zinc-400"
              >
                <User size={15} />
                Account
              </NavLink>
              <button
                onClick={logout}
                className="flex items-center gap-2 duration-150 text-md px-5 py-2 font-sans text-zinc-400"
              >
                <LogOut size={15} />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to={"/auth/login"}
                className="duration-150 text-md border border-zinc-700 bg-zinc-800 px-5 py-2 rounded-xl font-medium font-sans text-white hover:bg-zinc-700"
              >
                Log in
              </NavLink>
              <NavLink
                to={"/auth/signup"}
                className="duration-150 text-md border border-amber-400 bg-amber-400 px-5 py-2 rounded-xl font-medium font-sans text-black hover:bg-amber-300"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
