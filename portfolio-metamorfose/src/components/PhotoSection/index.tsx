import { Ifotos } from "@/types/types";
import Image from "next/image";
import { CategoryComponent } from "../CategorySection";
import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

export const FotoComponent: React.FC<{ fotos: Ifotos[] }> = ({ fotos }) => {
  const ref = useRef(null);

  const estaEnVista = useInView(ref, { once: false });
  const [animar, setAnimar] = useState<boolean>(false);

  useEffect(() => {
    if (estaEnVista) {
      setAnimar(true);
    } else {
      setAnimar(false);
    }
  }, [estaEnVista]);

  return (
    <motion.section>
      <div
        ref={ref}
        id="portfolio"
        className="h-[100vh] flex items-center mt-1 mask-fade z-0 bg-zinc-900"
      >
        <h2 className="font-[family-name:var(--font-bellota)] mx-4 text-2xl flex justify-center items-center flex-col">
          {"Portfolio".split("").map((letra, i) => (
            <span key={i} className={`${animar ? "masked-reveal" : ""}`}>
              {letra}
            </span>
          ))}
        </h2>
        <div ref={ref} className={`z-10 grid grid-cols-3 gap-1 overflow-y-scroll rounded h-[90vh] ${animar ? "fade-left" : ""}`}>
          {fotos.map((foto) => {
            return (
              <div key={foto.id} className="relative w-[25rem] h-[20rem]">
                <Image
                  src={foto.url}
                  alt={foto.title}
                  fill
                  className="object-cover fade-in"
                />
              </div>
            );
          })}
        </div>
        <CategoryComponent />
      </div>
    </motion.section>
  );
};
