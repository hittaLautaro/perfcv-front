import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

import logo from "../../assets/PERFCV_LOGO.svg";

const SignupPage = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register({ name, email, password });
    } catch (err) {
      setError(err.message);
    }
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

        <div className="bg-zinc-900 p-8 rounded-xl shadow-md w-full max-w-2xl border-zinc-800 border">
          <h2 className="text-2xl font-bold text-center text-zinc-100 mb-6">
            Create account
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
            <span className="text-zinc-300 font-medium">
              Sign up with Google
            </span>
          </button>

          <div className="flex justify-center items-center mt-4 mb-4">
            <span className="text-zinc-400">OR</span>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-zinc-300 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-zinc-800 text-white placeholder-zinc-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
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

            <div>
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-zinc-300 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-zinc-800 text-white placeholder-zinc-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="mt-2 md:col-span-2">
              <button
                type="submit"
                className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-amber-400 transition-all duration-300"
              >
                Create account
              </button>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-center text-zinc-400 mt-2">
                Already have an account?{" "}
                <NavLink
                  to="/auth/login"
                  className="text-amber-400 font-semibold hover:underline"
                >
                  Log in
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
