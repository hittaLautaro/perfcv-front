import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

const TemplateDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(location.state?.template || null);
  const [loading, setLoading] = useState(!template);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!template) {
      const fetchTemplate = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const headers = { "Content-Type": "application/json" };
          if (token) headers["Authorization"] = `Bearer ${token}`;

          const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/api/templates/${id}`, { headers });
          if (!response.ok) throw new Error("Failed to load template");
          
          const found = await response.json();
          
          if (found) {
             setTemplate({
              id: found.id,
              title: found.name,
              image: found.previewUrl,
              description: found.description
            });
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };
      fetchTemplate();
    }
  }, [id, template]);

  const handleDownload = async (format) => {
    try {
      setDownloading(true);
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/auth/login");
        return;
      }

      const headers = { "Content-Type": "application/json" };
      headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/api/templates/${id}/download?format=${format}`, {
        headers,
      });

      if (!response.ok) throw new Error("Failed to get download URL");

      const data = await response.json();
      if (data.downloadUrl) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.target = "_blank";
        link.download = `${template.title}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center text-white">Loading...</div>
    );
  }

  if (!template) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-white gap-4">
        <p>Template not found</p>
        <button onClick={() => navigate("/templates")} className="text-amber-400 hover:underline">
          Back to templates
        </button>
      </div>
    );
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-10 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 shadow-2xl">
          <img 
            src={template.image} 
            alt={template.title} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <button 
              onClick={() => navigate("/templates")}
              className="flex items-center gap-2 text-zinc-400 hover:text-white mb-3 transition-colors"
            >
              <ArrowLeft size={20} />
              Go back
            </button>
            <h1 className="text-4xl font-bold text-white mb-4">{template.title}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {template.description}
            </p>
          </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <button 
                onClick={() => handleDownload("pdf")}
                disabled={downloading}
                className="flex flex-col items-center justify-center py-2 bg-red-500/10 hover:bg-red-500/30 border border-red-500/30 rounded-xl transition-all group"
              >
                <div className="flex gap-2 flex-row align-center items-center transition-colors">
                  <Download size={20} className="text-red-500" />
                  <span className="text-red-500 font-mono font-normal">Download {"(.pdf)"}</span>
                </div>
              </button>

              <button
                onClick={() => handleDownload("docx")}
                disabled={downloading}
                className="flex flex-col items-center justify-center py-2 bg-blue-500/10 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl transition-all group"
              >
                <div className="flex gap-2 flex-row align-center items-center transition-colors">
                  <Download size={20} className="text-blue-500" />
                  <span className="text-blue-500 font-mono font-normal">Download {"(.docx)"}</span>
                </div>
              </button>
            </div>
        </div>
      </div>
    </main>
  );
};

export default TemplateDetail;
