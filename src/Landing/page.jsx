import { useState, useEffect } from "react";

import Hero from "./components/Hero";
import Footer from "../global/components/Footer";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      
      <Hero id="hero" isVisible={isVisible} />
      <Footer />
    </div>
  );
};

export default LandingPage;
