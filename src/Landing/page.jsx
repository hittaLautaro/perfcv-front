import { useState, useEffect } from "react";

import Hero from "./components/Hero";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  console.log("API URL:", import.meta.env.VITE_BACK_BASE_URL);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col bg-zinc-950">
      <Hero id="hero" isVisible={isVisible} />
    </div>
  );
};

export default LandingPage;
