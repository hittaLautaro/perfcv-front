import TemplateSelector from "./TemplateSelector";
import Header from "../Landing/components/Header";

const TemplatesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Header />
      <main className="flex-1 py-10 mt-20 flex justify-center items-start">
        <TemplateSelector />
      </main>
    </div>
  );
};

export default TemplatesPage;
