import { Ifotos } from "@/types/types";
import Image from "next/image";
import { CategoryComponent } from "../CategorySection";
import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import  Modal  from "../ModalPreviewPhotos";
import { Loader } from "../Loader";
export const FotoComponent: React.FC<{ fotos: Ifotos[] }> = ({ fotos }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const estaEnVista = useInView(containerRef, { once: false });
  const [animar, setAnimar] = useState<boolean>(false);

  useEffect(() => {
    setAnimar(estaEnVista);
  }, [estaEnVista]);

  const [selectedImage, setSelectedImage] = useState<Ifotos | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (foto: Ifotos) => {
    setSelectedImage(foto);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = ""; 
  };
    const { url, title } = selectedImage || {};
  const imageUrl = url ? (typeof url === "string" ? url : URL.createObjectURL(url as File)) : "";
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

        <OverlayScrollbarsComponent
          id="scroolPersonalizado"
          options={{ scrollbars: { autoHide: "scroll" } }}
          style={{
            maxHeight: "80vh",
            height: "74vh",
            overflowY: "auto",
            transition: "duration 300ms ease in-out",
          }}
        >
          <div
            className={`z-10 grid grid-cols-3 gap-1 px-8 sm:px-56   ${
              animar ? "fade-left" : ""
            }`}
          >
            { fotos ? fotos.map((foto) => {
              return (
                <div
                  key={foto.id}
                  className="relative w-full aspect-square overflow-hidden rounded-sm"
                  onClick={() => openModal(foto)}
                >
                  <Image
                    src={foto.url}
                    alt={foto.title}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                  />
                </div>
              );
            }):(<div
            className="w-full aspect-square overflow-hidden rounded-sm">
              <Loader/></div>)}
          </div>
        </OverlayScrollbarsComponent>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div
              className=" 
              xl:w-[40vw] xl:h-[auto]
              lg:w-[48vw] lg:h-[auto]
              md:w-[58w] md:h-[auto]
              sm:w-[64vw] sm:h-[auto]
              w-[79vw] h-[auto] bg-transparent
              flex justify-center items-center animate-fade-in"
            >
              <Image
              className="bg-gray-100 w-5xl h-96 object-cover rounded-sm"
                src={imageUrl}
                alt={title || "Imagen"}
                width={1200}
                height={800}
              />
            </div>
          </Modal>
      </div>
    </motion.section>
  );
};
