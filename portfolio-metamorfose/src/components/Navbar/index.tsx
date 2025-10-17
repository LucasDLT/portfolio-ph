import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [labelButton, setLabelButton] = useState<string>("");

useEffect(() => {
  if (isOpen) {
    setLabelButton("x");
  } else {
    setLabelButton("≡");
  }
}, [isOpen]);

  const openMenu = () => {
    setIsOpen(!isOpen);
    };

  return (
    <motion.section
    initial={{ opacity: 1, y: 0 }}
    animate={isOpen ? { opacity: 1, y: 0 } : { }}
    >  
    <nav className={`fixed z-100 font-[family-name:var(--font-shadows)] tracking-widest flex flex-col justify-center items-end text-[0.9rem] right-2 top-4 masked-reveal h-40`}>
      <button
        onClick={openMenu}
        className={`hover:cursor-pointer text-white hover:text-gray-400 transition-all duration-300 ease-in-out text-xl  w-6 sm:hidden animate-pulse bg-black absolute left-10`}
      >
        {labelButton}
      </button>
      <ul
        className={`z-20 gap-3 transform transition-all duration-300 ease-in-out
  flex flex-col justify-center items-center 
  sm:static sm:flex-row sm:opacity-100 sm:pointer-events-auto
  ${
    isOpen
      ? "translate-y-8 mr-1 justify-center items-end opacity-100 pointer-events-auto"
      : "translate-y-[-100%] mr-1 justify-center items-end opacity-0 pointer-events-none"
  }
  sm:translate-y-0`}
      >
        <a
        onClick={openMenu} 
        className="text-white hover:text-gray-400 duration-300" href="#home">
          inicio
        </a>
        <a
          onClick={openMenu}
          className="text-white hover:text-gray-400 duration-300"
          href="#portfolio"
        >
          portfolio
        </a>
        <a
          onClick={openMenu}
          className="text-white hover:text-gray-400 duration-300"
          href="#conoceme"
        >
          conoceme
        </a>
        <a
          onClick={openMenu}
          className="text-white hover:text-gray-400 duration-300"
          href="#contacto"
        >
          contacto
        </a>
      </ul>
    </nav>
    </motion.section>
  );
};