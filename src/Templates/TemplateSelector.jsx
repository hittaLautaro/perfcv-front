import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Sparkles } from "lucide-react";
import TemplateCard from "./TemplateCard";
import { useAuth } from "../context/AuthContext";

// Mock Data
const MOCK_TEMPLATES = [
  {
    id: 1,
    title: "Professional Modern",
    displayName: "Professional Modern",
    price: 0,
    tags: ["Professional", "Clean", "ATS-Friendly"],
    image: "https://placehold.co/600x800/e2e8f0/475569?text=Professional+Modern",
    category: "Modern"
  },
  {
    id: 2,
    title: "Creative Designer",
    displayName: "Creative Designer",
    price: 4.99,
    tags: ["Creative", "Colorful", "Portfolio"],
    image: "https://placehold.co/600x800/fef3c7/d97706?text=Creative+Designer",
    category: "Creative"
  },
  {
    id: 3,
    title: "Executive Suite",
    displayName: "Executive Suite",
    price: 9.99,
    tags: ["Executive", "Minimalist", "Premium"],
    image: "https://placehold.co/600x800/1e293b/94a3b8?text=Executive+Suite",
    category: "Premium"
  },
  {
    id: 4,
    title: "Tech Minimalist",
    displayName: "Tech Minimalist",
    price: 0,
    tags: ["Tech", "Simple", "Code"],
    image: "https://placehold.co/600x800/f0f9ff/0ea5e9?text=Tech+Minimalist",
    category: "Simple"
  },
  {
    id: 5,
    title: "Bold Statement",
    displayName: "Bold Statement",
    price: 2.99,
    tags: ["Bold", "Unique", "Marketing"],
    image: "https://placehold.co/600x800/fee2e2/ef4444?text=Bold+Statement",
    category: "Creative"
  },
  {
    id: 6,
    title: "Classic Chronological",
    displayName: "Classic Chronological",
    price: 0,
    tags: ["Classic", "Traditional", "Academic"],
    image: "https://placehold.co/600x800/f8fafc/64748b?text=Classic+Chronological",
    category: "Simple"
  },
  {
    id: 7,
    title: "Startup Founder",
    displayName: "Startup Founder",
    price: 14.99,
    tags: ["Startup", "Modern", "Versatile"],
    image: "https://placehold.co/600x800/f0fdf4/16a34a?text=Startup+Founder",
    category: "Premium"
  },
  {
    id: 8,
    title: "Academic CV",
    displayName: "Academic CV",
    price: 0,
    tags: ["Academic", "Detailed", "Research"],
    image: "https://placehold.co/600x800/fff7ed/ea580c?text=Academic+CV",
    category: "Simple"
  }
];

const FILTERS = ["All", "Modern", "Creative", "Simple", "Premium"];

const TemplateSelector = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTemplates = useMemo(() => {
    return MOCK_TEMPLATES.filter((template) => {
      const matchesSearch = template.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "All" || template.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const handleTemplateSelect = (template) => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    // Logic for purchasing/using template would go here
    alert(`You selected ${template.title}. Since you are logged in, you can proceed!`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 mb-4 tracking-tight">
          Find Your Perfect <span className="text-amber-500">Resume</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Browse our collection of professionally designed templates. Stand out from the crowd with a resume that represents you.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-800">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-zinc-700 rounded-xl leading-5 bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-zinc-800 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
          {FILTERS.map((filter) => (
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

      {/* Results Count */}
      <div className="mb-6 flex items-center gap-2 text-zinc-500 text-sm font-medium">
        <Sparkles className="w-4 h-4 text-amber-500" />
        {filteredTemplates.length} templates found
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleTemplateSelect}
          />
        ))}
      </div>

      {/* Empty State */}
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
            className="mt-6 text-amber-500 font-semibold hover:text-amber-400 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
