import { MousePointerClick, Sparkles } from "lucide-react";

const TemplateCard = ({ template, onSelect, onPreview }) => {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-zinc-900 transition-all duration-300 border border-zinc-800">

      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-800">
        <img
          src={template.image}
          alt={template.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
          <button
            onClick={() => onSelect(template)}
            className="bg-amber-400 hover:bg-amber-300 text-black font-bold py-2 px-5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl flex items-center gap-2 text-sm"
          >
            <MousePointerClick size={20} />
            Use this template
          </button>
        </div>

        <div className="absolute top-3 right-3 bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-zinc-100 shadow-sm border border-zinc-700">
          {template.price === 0 ? "Free" : `$${template.price}`}
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-zinc-100 leading-tight transition-colors">
            {template.title}
          </h3>

          <p className="font-normal text-xs text-zinc-400 leading-tight line-clamp-1">
            {template.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
