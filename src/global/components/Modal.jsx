import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
      
      const header = document.getElementById("main-header");
      if (header) header.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
      
      const header = document.getElementById("main-header");
      if (header) header.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
      
      const header = document.getElementById("main-header");
      if (header) header.style.paddingRight = "0px";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full max-w-md transform rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl transition-all animate-scaleIn"
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-100 font-sans">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="text-zinc-300 font-sans">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
