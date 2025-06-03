import { Ifotos } from "@/types/types";
import Image from "next/image";

export const FotoComponent: React.FC<{ fotos: Ifotos[] }> = ({ fotos }) => {
  return (
    <div  id="portfolio" className="h-[100vh] flex flex-col items-center mt-30">
      <h2 className="font-[family-name:var(--font-bellota)] tracking-widest text-2xl">Portfolio</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 overflow-y-scroll rounded h-[90vh]">
        {fotos.map((foto) => {
          return (
            <div key={foto.id} className="relative">
              <div className="w-90 h-70">
                <Image
                  src={foto.url}
                  alt={foto.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
