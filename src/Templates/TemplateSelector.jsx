import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Sparkles, Loader2 } from "lucide-react";
import TemplateCard from "./TemplateCard";
import { useAuth } from "../context/AuthContext";



const TemplateSelector = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          "Content-Type": "application/json",
        };
        
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        console.log("Fetching templates with token:", token ? "Present" : "Missing");

        const response = await fetch("http://localhost:8080/api/templates", {
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
        
        const mappedTemplates = data.map(template => ({
          id: template.id,
          title: template.name,
          displayName: template.name,
          price: template.price ? Number(template.price) : 0,
          tags: [template.category, template.isPremium ? "Premium" : "Free"].filter(Boolean),
          image: template.previewUrl,
          category: template.category
        }));

        setTemplates(mappedTemplates);
      } catch (err) {
        console.error("Error fetching templates:", err);
        setError(err.message || "Failed to load templates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const filters = useMemo(() => {
    const dynamicCategories = templates.map(t => t.category).filter(Boolean);
    const predefined = ["All", "ATS", "Creative", "Professional", "Modern"];
    const unique = [...new Set([...predefined, ...dynamicCategories])];
    return unique.slice(0, 6);
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch = template.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "All" || template.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, templates]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handlePreview = (template) => {
    setSelectedImage(template.image);
  };

  const handleTemplateSelect = async (template) => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:8080/api/templates/${template.id}/download`, {
        headers,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to get download URL");
      }

      const data = await response.json();
      
      if (data.downloadUrl) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = `${template.title}.pdf`; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error("Error downloading template:", err);
      alert("Failed to download template. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 text-amber-500 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="mb-16 mt-10 text-center">
        <h1 className="text-4xl text-5xl font-bold text-white mb-4 tracking-tight">
          Resume templates
        </h1>
        <p className="text-md text-zinc-300 max-w-2xl mx-auto">
          All of our templates are designed to give you the best chances to
          <span className="font-semibold">
            {" "}get you hired.
          </span>
        </p>
      </div>


      <div className="mb-10 flex justify-center items-center rounded-2xl shadow-sm ">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-zinc-100 text-black shadow-md"
                  : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2 text-zinc-500 text-sm font-medium">
        <Sparkles className="w-4 h-4 text-amber-500" />
        {filteredTemplates.length} templates found
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-6 space-y-6 pb-20">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleTemplateSelect}
            onPreview={handlePreview}
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
            onClick={() => {setSearchQuery(""); setActiveFilter("All");}}
            className="mt-6 text-zinc-400 font-semibold hover:text-zinc-300 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-black/50 hover:bg-zinc-800 rounded-full p-2 transition-all z-50"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img 
              src={selectedImage} 
              alt="Template Preview" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
