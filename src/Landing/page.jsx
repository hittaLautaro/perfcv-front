import { useState, useEffect } from "react";

import Hero from "./components/Hero";
import Header from "./components/Header";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <Header />

      <Hero id="hero" isVisible={isVisible} />

      <footer className=" w-full py-5 border-t border-zinc-800 bg-zinc-950 text-center text-zinc-400">
        <p className="text-xs max-w-screen-sm mx-auto px-4 break-words">
          &copy; {new Date().getFullYear()} PerfCV. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
