import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Sparkles, Loader2 } from "lucide-react";
import TemplateCard from "./TemplateCard";

const fetchTemplates = async () => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    console.log("Fetching templates with token:", token ? "Present" : "Missing");

    const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/api/templates`, {
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
    
    return data.map(template => ({
      id: template.id,
      title: template.name,
      displayName: template.name,
      price: template.price ? Number(template.price) : 0,
      tags: [template.isPremium ? "Premium" : "Free"].filter(Boolean),
      image: template.previewUrl,
      categories: template.categories || [],
      description: template.description
    }));
};

const TemplateSelector = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: templates = [], isLoading, error } = useQuery({
    queryKey: ['templates'],
    queryFn: fetchTemplates,
  });

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 text-amber-500"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="mb-16 mt-10 text-center">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Resume templates
        </h1>
        <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
          All our templates are designed to pass{" "}
          <span className="font-bold">
            ATS scans
          </span>
          {" "}and maximize{" "}
          <span className="font-bold">
            your hiring potential.
          </span>
        </p>
      </div>

      <div className="mb-6 flex items-center gap-2 text-zinc-500 text-sm font-medium">
        <Sparkles className="w-4 h-4 text-amber-500" />
        {filteredTemplates.length} templates found
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-20">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleTemplateSelect}
          />
        ))}
      </div>

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
