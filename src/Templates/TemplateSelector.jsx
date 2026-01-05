import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Sparkles, Loader2, ArrowLeft, ArrowLeftIcon, StepBack, StepBackIcon, ChevronLeft, ChevronRight } from "lucide-react";
import TemplateCard from "./TemplateCard";
import TemplatesSectionHero from "./TemplatesSectionHero";
import { BiArrowBack, BiErrorCircle } from "react-icons/bi";
import { BsBack } from "react-icons/bs";
import { IoArrowBackSharp } from "react-icons/io5";

const fetchTemplates = async ({ page = 1, limit = 6 }) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/api/templates?page=${page}&limit=${limit}`, {
      headers,
      credentials: "include",
    });

    if (response.status === 403) {
      throw new Error("Access denied. Please log in to view templates.");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch templates");
    }

    const data = await response.json();
    
    return {
      templates: data.templates.map(template => ({
        id: template.id,
        title: template.name,
        image: template.previewUrl,
        description: template.description
      })),
      totalPages: data.totalPages,
      totalItems: data.totalItems,
      page: data.page
    };
};

const TemplateSelector = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['templates', page],
    queryFn: () => fetchTemplates({ page, limit }),
  });

  const templates = data?.templates || [];
  const totalPages = data?.totalPages || 0;

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch = template.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery, templates]);

  const handleTemplateSelect = (template) => {
      navigate(`/templates/${template.id}`, { state: { template } });
  };

  const handlePreviousPage = () => {
    setPage((old) => Math.max(old - 1, 1));
  };

  const handleNextPage = () => {
    setPage((old) => (data?.totalPages && old < data.totalPages ? old + 1 : old));
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TemplatesSectionHero />
        <div className="flex justify-center items-center min-h-[500px]">
          <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
        </div>
        <div className="flex justify-center items-center gap-2 pb-20 mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="p-2 text-sm font-medium text-zinc-300 bg-zinc-900 rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`w-8 h-8 text-sm font-medium rounded-md transition-colors ${
                page === pageNum
                  ? "bg-zinc-100 text-zinc-900"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="p-2 text-sm font-medium text-zinc-300 bg-zinc-900 rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <TemplatesSectionHero />
        <div className="flex justify-center items-center py-5 min-h-[400px]">
          <div className="flex flex-col items-center">
            <BiErrorCircle className="w-10 h-10 text-red-400 mb-4" />
            <p className="text-red-400 text-center">There was an error loading the templates, <br /> 
            please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <TemplatesSectionHero />

      <div className="mb-6 flex items-center gap-2 text-zinc-500 text-sm font-medium">
        <Sparkles className="w-4 h-4 text-amber-500" />
        {data?.totalItems || 0} templates found
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-10">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleTemplateSelect}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pb-20 mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="p-2 text-sm font-medium text-zinc-300 bg-zinc-900 rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`w-8 h-8 text-sm font-medium rounded-md transition-colors ${
                page === pageNum
                  ? "bg-zinc-100 text-zinc-900"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="p-2 text-sm font-medium text-zinc-300 bg-zinc-900 rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {filteredTemplates.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4">
            <Filter className="w-8 h-8 text-zinc-600" />
          </div>
          <h3 className="text-xl font-bold text-zinc-100 mb-2">No templates found</h3>
          <p className="text-zinc-500">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button 
            onClick={() => {setSearchQuery("");}}
            className="mt-6 text-zinc-400 font-semibold hover:text-zinc-300 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    

    </div>
  );
};

export default TemplateSelector;
