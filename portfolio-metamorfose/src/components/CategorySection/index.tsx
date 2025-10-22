import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/context/context";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineFilter, HiOutlineChevronDown } from "react-icons/hi";

export const CategoryComponent: React.FC = () => {
  const { categorias, setFotos, prevFotos } = useContext(Context);
  const [activo, setActivo] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleAll = () => {
    setFotos(prevFotos);
    setActivo("PORTFOLIO");
    setOpen(false);
  };

  const handleCategory = (category: any) => {
    setFotos(category.images);
    setActivo(category.name);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-controls="category-panel"
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/6 hover:bg-white/10 text-sm font-[family-name:var(--font-bellota)]"
        style={{ minHeight: 40 }}
      >
        <HiOutlineFilter className="w-5 h-5" />
        <span className="text-sm">{activo ? activo : "Filtros"}</span>
        <HiOutlineChevronDown className={`${open ? "rotate-180" : "rotate-0"} transition-transform`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="category-panel"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute top-full right-0 mt-2 z-50 bg-zinc-800/95 border border-white/5 rounded-lg p-2 shadow-lg w-[min(360px,95vw)] max-h-[60vh] overflow-auto"
            role="menu"
            aria-label="Panel de categorías"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={handleAll}
                className={`text-left px-3 py-2 rounded text-sm ${activo === "PORTFOLIO" ? "bg-white/6" : "bg-transparent"}`}
                role="menuitem"
              >
                PORTFOLIO
              </button>

              {categorias.map((category: any) => (
                
                <button
                  key={category.id}
                  onClick={() => handleCategory(category)}
                  className={`text-left px-3 py-2 rounded text-sm ${activo === category.name ? "bg-white/6" : "bg-transparent"}`}
                  role="menuitem"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
