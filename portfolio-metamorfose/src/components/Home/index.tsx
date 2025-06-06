import { useInView, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ButtonContact } from "../ButtonContact";


export function HomeComponent() {
  const ref = useRef(null);
  const estaEnVista = useInView(ref, { once: false,  });
  const [animar, setAnimar] = useState<boolean>(false);

  useEffect(() => {
    if (estaEnVista) {
      setAnimar(true);
    } else {
      setAnimar(false); 
    }
  }, [estaEnVista]);  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 1, y: 0 }}
      animate={estaEnVista ? { opacity: 1, y: 0 } : { }}
    >
    <div id="home" className="relative z-0 overflow-x-hidden overflow-y-hidden h-[100vh]">
      <div className=" flex justify-between items-center mt-[-10]">
        <div className="relative m-3 w-9 h-9 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10  xl:h-10 2xl:w-10 2xl:h-10">
          <Image
            src={"/logo.png"}
            alt={"metamorfose-logo"}
            fill
            className="object-contain "
          />
        </div>
      </div>
      <div className={`transition-all duration-1000 ease-in-out absolute w-[70%] h-[80%] top-[15%] right-[15%] md:w-[40%] md:h-[110%] md:right-[-15%] md:top-[-10%] z-[-1]  ${ animar ? "fade-right" : ""}`}>
        <Image
          src={"/camara-fondo.jpg"}
          alt={"metamorfose-fondo"}
          fill
          className="object-contain mask-fade"
        />
      </div>
      <div className="animate-reveal flex justify-center items-center sm:justify-start ">
        <h1
          style={{ textShadow: "1px 1px 5px #67676784,-1px -1px 5px #4946461b" }}
          className={`
        font-[family-name:var(--font-bellota)] font-extrabold
      mt-[30%] text-[2.8rem] 
      sm:text-6xl sm:text-left sm:ml-15 sm:mt-[30%] 
      md:text-7xl md:mt-[20%] 
      lg:text-8xl lg:mt-[15%]
      xl:text-[9.5rem]  xl:mt-[15%]
      2xl:text-[9.5rem] 2xl:mt-[12%]
      z-10 ${ animar ? "masked-reveal" : ""} 
      `}
        >
          METAMORFOSE PH
        </h1>
      </div>
      <div className={` flex w-full justify-center items-center text-center sm:text-left sm:justify-start sm:ml-16  ${ animar ? "masked-reveal" : ""}`}>
        <p className="text-2xl font-[family-name:var(--font-shadows)] tracking-widest masked-reveal" >
          Viviendo metamorfosis.
        </p>
      </div>
      <div className={`flex justify-center items-center ${ animar ? "fade-button-in" : ""}`}>
        <ButtonContact />
      </div>
    </div>
    </motion.section>
  );
}