import { useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { BiError } from "react-icons/bi";

const TemplateSmallSelector = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const {
    data: templates = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["templates"],
    queryFn: () =>
      fetch("http://localhost:8080/api/templates", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  });

  const handleTemplateSelect = (template) => {
    navigate(`/templates/${template.id}/fill?template=${template.displayName}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl w-full mx-auto p-5 border border-gray-800 rounded-xl shadow-lg shadow-gray-300 bg-white">
        <div className="flex flex-row justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-800 ">
            Choose a{" "}
            <span className="underline decoration-amber-400">template</span>
          </h2>
          <NavLink
            to={"/templates"}
            className=" border border-black px-3 py-2 rounded font-medium bg-amber-300"
          >
            View all
          </NavLink>
        </div>
        <div className="text-xl text-gray-600 min-h-64 text-center flex items-center justify-center">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      </div>
    );
  }

  if (!isLoading && error) {
    return (
      <div className="max-w-7xl w-full mx-auto p-5 border border-gray-800 rounded-xl shadow-lg shadow-gray-300 bg-white">
        <div className="flex flex-row justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-800 ">
            Choose a{" "}
            <span className="underline decoration-amber-400">template</span>
          </h2>
          <NavLink
            to={"/templates"}
            className=" border border-black px-3 py-2 rounded font-medium bg-amber-300"
          >
            View all
          </NavLink>
        </div>
        <div className="text-lg font-semibold text-red-600 min-h-64 text-center flex items-center justify-center">
          <BiError size={25} className="mr-2" />
          Error! Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl w-full mx-auto p-5 rounded-xl bg-white border border-gray-800 shadow-lg shadow-gray-300">
      <div className="flex flex-row justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-800 ">
          Choose a{" "}
          <span className="underline decoration-amber-400">template</span>
        </h2>
        <NavLink
          to={"/templates"}
          className=" border border-black px-3 py-2 rounded font-medium bg-amber-300"
        >
          View all
        </NavLink>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 ">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateSelect(template)}
            className="bg-white rounded-lg shadow-md hover:shadow-md border border-slate-800 duration-300 cursor-pointer p-3  hover:scale-105 transition-transform min-h-64"
          >
            <p className="text-md font-bold text-gray-800 mt-1">
              {template.displayName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSmallSelector;
