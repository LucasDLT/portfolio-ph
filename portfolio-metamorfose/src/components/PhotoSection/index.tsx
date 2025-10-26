import { Ifotos } from "@/types/types";
import Image from "next/image";
import { CategoryComponent } from "../CategorySection";
import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

export const FotoComponent: React.FC<{ fotos: Ifotos[] }> = ({ fotos }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const estaEnVista = useInView(containerRef, { once: false });
  const [animar, setAnimar] = useState<boolean>(false);

  useEffect(() => {
    setAnimar(estaEnVista);
  }, [estaEnVista]);

  return (
    <motion.section>
      <div
        ref={containerRef}
        id="portfolio"
        className="bg-black text-white min-h-screen p-4 md:p-8 "
      >
        <div className="mb-4 flex items-center justify-evenly relative">
          <h2 className="font-[family-name:var(--font-bellota)] text-2xl md:text-3xl">
            {"Portfolio".split("").join("")}
          </h2>

          <CategoryComponent />
        </div>

        <div
          
          className={`z-10 grid grid-cols-3 gap-1 px-8 sm:px-56   ${animar ? "fade-left" : ""}`}
        >
          {fotos.map((foto) => {
            return (
              <div key={foto.id} className="relative w-full aspect-square overflow-hidden rounded-sm">
                <Image
                  src={foto.url}
                  alt={foto.title}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
