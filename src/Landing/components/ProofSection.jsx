import { NavLink } from "react-router-dom";
import imageBadAts from "../../assets/bad-ats-resume.jpg";
import imageGoodAts from "../../assets/good-ats-resume.webp";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const ProofSection = () => {
  const table = [
    ["Tables & columns", "Content may be misread or skipped"],
    ["Images or icons", "ATS can’t read visuals"],
    ["Fancy designs", "Looks good, confuses ATS"],
    ["Headers/footers", "Some ATS ignore these areas"],
    ["Uncommon section titles", "ATS might not understand the section"],
    ["Acronyms without context", "May not match expected keywords"],
  ];

  return (
    <section className="min-h-screen bg-slate-800  flex items-center justify-center">
      <div className="grid xl:grid-cols-2 grid-cols-1 h-full w-full">
        <div className="flex flex-col justify-center items-center h-full w-full px-auto py-12 text-zinc-200 bg-slate-800 px-5">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-sans font-extrabold leading-tight">
            Make a resume <br />
            <span className="text-amber-400">built to pass</span>{" "}
            <span className="underline decoration-amber-400">ATS filters</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-center mt-4 max-w-2xl">
            Many resumes get filtered out before a human ever sees them. Avoid
            common mistakes that break applicant tracking systems (ATS)
          </p>

          <div className="mt-8 w-full max-w-3xl overflow-x-auto">
            <table className="w-full border-collapse border border-slate-600 text-left text-sm sm:text-base">
              <thead className="bg-slate-700 text-zinc-100">
                <tr>
                  <th className="border border-slate-600 px-4 py-2">
                    ⚠️ Don’t use
                  </th>
                  <th className="border border-slate-600 px-4 py-2">
                    ❌ Why it breaks ATS
                  </th>
                </tr>
              </thead>
              <tbody>
                {table.map(([bad, reason], i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-slate-800" : "bg-slate-700"}
                  >
                    <td className="border border-slate-600 px-4 py-2">{bad}</td>
                    <td className="border border-slate-600 px-4 py-2">
                      {reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <NavLink
            to={"/templates"}
            className="block bg-amber-400 text-slate-800 text-lg mt-10 px-6 py-3 rounded-xl font-semibold font-mono border border-slate-800 hover:bg-amber-500 hover:text-black hover:border-zinc-900 transition-colors duration-300"
          >
            Create your resume!
          </NavLink>
        </div>

        <div className="flex flex-row gap-10 justify-center items-center pb-12 px-5">
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-lg md:text-xl lg:text-2xl text-center font-sans font-medium text-green-500 mb-5  decoration-green-500 flex flex-row items-center justify-center">
              <TiTick size={35} />
              Passed ATS
            </h1>
            <img
              src={imageGoodAts}
              alt="Description"
              className="object-contain w-[calc(400px)] rounded-lg"
            />
          </div>
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-lg md:text-xl lg:text-2xl text-center font-sans font-medium text-red-500 mb-5  decoration-red-500 flex flex-row items-center justify-center gap-2">
              <ImCross size={20} /> Rejected by ATS
            </h1>
            <img
              src={imageBadAts}
              alt="Description"
              className="object-contain w-[calc(400px)] rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
