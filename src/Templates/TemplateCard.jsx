import { Eye, Download } from "lucide-react";

const TemplateCard = ({ template, onSelect, onPreview }) => {
  return (
    <div className="group relative break-inside-avoid mb-6 rounded-xl overflow-hidden bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-800">

      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-800">
        <img
          src={template.image}
          alt={template.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />


        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
          <button
            onClick={() => onSelect(template)}
            className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 shadow-lg"
          >
            <Download size={18} />
            Download
          </button>
          <button 
            onClick={() => onPreview(template)}
            className="bg-zinc-800/90 hover:bg-zinc-800 text-white font-medium py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 flex items-center gap-2 shadow-lg backdrop-blur-sm"
          >
            <Eye size={18} />
            Preview
          </button>
        </div>


        <div className="absolute top-3 right-3 bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-zinc-100 shadow-sm border border-zinc-700">
          {template.price === 0 ? "Free" : `$${template.price}`}
        </div>
      </div>


      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-zinc-100 leading-tight group-hover:text-amber-400 transition-colors">
            {template.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
