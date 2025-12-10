import React from "react";
import { ArrowRight, ArrowRightCircle, CornerDownRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const Hero = ({ isVisible }) => {
  return (
    <section className="min-h-[calc(93vh)] bg-zinc-950 flex items-center justify-center">
      <div
        className={`transition-all justify-items-center duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-sans text-zinc-100 font-bold rounded text-balance">
          Get the{" "}
          <span className="underline decoration-amber-400 text-amber-400 font-extrabold">Perfect CV</span> to
          land a job
        </h1>
        <p className="font-sans italic text-lg md:text-xl lg:text-2xl xl:text-2xl text-zinc-300 text-center font-normal mt-5">
          Choose from any of our <span className="font-bold">
            free & ATS-friendly
          </span> templates to give you the best chances to{" "}
          <span className="font-bold">
            get hired.
          </span>
        </p>
        <NavLink
          to={"/templates"}
          className="flex items-center gap-2 block bg-white text-black text-xl mt-10 px-4 py-3 rounded-xl font-semibold font-mono border border-white hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-colors duration-500"
        >
          <ArrowRightCircle size={25} />
          {" "}
          View our templates
        </NavLink>
      </div>
    </section>
  );
};

export default Hero;
