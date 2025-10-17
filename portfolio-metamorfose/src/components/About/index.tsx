import Image from "next/image";
import { useInView, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const AboutComponent = () => {
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
      id="conoceme"
      className="h-[100vh] flex justify-between items-center mt-1"
      ref={ref}
    >
      <div className="flex flex-col w-full justify-between items-center h-[100vh] ">
        <h1 className={`font-[family-name:var(--font-bellota)] mx-4 text-8xl flex justify-center items-center flex-col text-center ${animar ?` fade-bottom` : ""} `}>
          Mi mundo en pocas palabras
        </h1>
        <section className="text-white text-center h-full md:w-[50rem] flex items-center">
          <p className={`font-semibold font-[family-name:var(--font-bellota)] tracking-widest ${animar ?` fade-bottom` : ""}`}>
            ...Nacida en Brasil, la naturaleza siempre fue parte de mi esencia.
            Desde pequeña, el arte fue mi refugio: dibujar, crear, observar el
            mundo con otros ojos. Mi deseo de descubrir me llevó a explorar
            nuevos caminos, y así llegué a Argentina. Fue en ese viaje interior
            y exterior donde la fotografía me encontró (o tal vez yo la encontré
            a ella). Con la cámara en mano descubrí una forma única de
            expresarme, de transformar emociones en imágenes. La fotografía me
            dio libertad, me hizo sentir presente, viva y conectada. Hoy
            comparto esa mirada con el mundo, una imagen a la vez..
          </p>
        </section>

        <section className={`${animar ?` fade-top` : ""} z-[1] h-[15rem] flex items-center w-full justify-evenly overflow-hidden transition-all duration-300 ease-in-out`}>
          <h3 className="font-[family-name:var(--font-bellota)] hover:cursor-pointer  hover:blur-xs transition-all duration-300">
            ARTE
          </h3>
          <h3 className="font-[family-name:var(--font-bellota)] hover:cursor-pointer  hover:blur-xs transition-all duration-300">
            FOTOGRAFIA
          </h3>
          <h3 className="font-[family-name:var(--font-bellota)] hover:cursor-pointer  hover:blur-xs transition-all duration-300">
            NATURALEZA
          </h3>
        </section>
      </div>

      <div className="z-[-1] mask-fade w-[40rem]  h-[40rem] flex items-center overflow-hidden mr-70">
        <Image
          src="/about-image.jpeg"
          alt="metamorfose-fondo"
          width={2500}
          height={2500}
          className={`object-cover w-full h-full z-[-1] mask-fade border-2 border-white ${animar ? `fade-top` : ""}`}
        />
      </div>
    </div>
    </motion.section>
  );
};
