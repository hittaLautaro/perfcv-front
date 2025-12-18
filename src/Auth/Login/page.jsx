import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext.jsx";

import logo from "../../assets/PERFCV_LOGO.svg";
import { BiErrorCircle } from "react-icons/bi";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] px-4">
        <NavLink
          to={"/"}
          className="mb-12"
        >
          <img src={logo} alt="PerfCV Logo" className="h-16 w-auto" />
        </NavLink>

        <div className="bg-zinc-900 p-8 rounded-xl shadow-md w-full max-w-md border-zinc-800 border">
          <h2 className="text-2xl font-bold text-center text-zinc-100 mb-6">
            Log in
          </h2>

          <button
            onClick={() => window.location.href = `${import.meta.env.VITE_BACK_BASE_URL}/oauth2/authorization/google`}
            className="flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-md w-full px-4 py-2 shadow-sm hover:shadow-md hover:bg-zinc-750 transition-all duration-300"
          >
            <svg
              className="w-6 h-6 mr-3"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.5-1.6-34.4-4.8-50.8H272v95.9h146.9c-6.3 34.3-25.4 63.4-54.4 82.8v68h87.8c51.2-47.2 80.2-116.7 80.2-195.9z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c73.6 0 135.5-24.3 180.7-65.9l-87.8-68c-24.4 16.4-55.8 26.2-92.9 26.2-71.5 0-132-48.3-153.7-113.2h-90.8v70.9c45.4 90.5 138.8 150 244.5 150z"
              />
              <path
                fill="#FBBC05"
                d="M118.3 321.4c-10.3-30.4-10.3-63 0-93.4v-70.9h-90.8c-38.6 75.8-38.6 166.6 0 242.4l90.8-70.9z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c39.9 0 75.7 13.7 103.8 40.6l77.8-77.8C399.9 24.9 341 0 272 0 166.3 0 72.9 59.5 27.5 150l90.8 70.9c21.7-64.9 82.2-113.2 153.7-113.2z"
              />
            </svg>
            <span className="text-zinc-300 font-medium">Login with Google</span>
          </button>

          <div className="flex justify-center items-center mt-4 mb-4">
            <span className="text-zinc-400">OR</span>
          </div>

          <form onSubmit={handleSubmit}>

            {mutation.isError && (
              <div className="flex flex-row items-center border gap-3 border-red-600 bg-red-800/30 text-red-400 p-2 text-sm rounded-md mb-4">
                <BiErrorCircle className="w-8 h-8 text-red-400" />
                <p className="text-red-400 text-sm">Error trying to login, please try again later.</p>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-zinc-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-zinc-800 text-white placeholder-zinc-500"
                placeholder="ejemplo@email.com"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-zinc-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-zinc-800 text-white placeholder-zinc-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center bg-white text-black py-2 rounded-lg font-semibold hover:bg-amber-400 transition-all duration-300"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "Log in"}
            </button>

            <p className="text-sm text-center text-zinc-400 mt-4">
              Don't have an account?{" "}
              <NavLink
                to="/auth/signup"
                className="text-amber-400 font-semibold hover:underline"
              >
                Sign up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
