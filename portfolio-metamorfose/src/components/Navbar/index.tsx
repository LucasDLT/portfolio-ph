import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [labelButton, setLabelButton] = useState<string>("");

useEffect(() => {
  if (isOpen) {
    setLabelButton("x");
    document.body.classList.add("overflow-hidden");

  } else {
    setLabelButton("≡");
    document.body.classList.remove("overflow-hidden");
  }
  return () => {
    document.body.classList.remove("overflow-hidden");
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
<nav className="fixed top-0 left-0 w-screen z-[120] font-[family-name:var(--font-shadows)] tracking-widest text-[0.9rem]">
  {/* Botón hamburguesa - Mobile */}
  <button
    onClick={openMenu}
    className={ `sm:hidden text-white bg-zinc-900 rounded p-2 m-4 text-xl z-[110] fixed top-0 right-0 ${isOpen ? "hidden" : ""} `}
  >
    ≡
  </button>

  {/* Menú Mobile */}
  <AnimatePresence>
    {isOpen && (
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center gap-6 bg-zinc-900/95 z-[100]"
      >
        <li>
          <button
            aria-label="Cerrar menú"
            onClick={openMenu}
            className="text-white text-3xl font-bold hover:opacity-80 transition-opacity"
          >
            x
          </button>
        </li>
        <li>
          <a href="#home" onClick={openMenu} className="text-white text-2xl hover:text-gray-400">
            inicio
          </a>
        </li>
        <li>
          <a href="#portfolio" onClick={openMenu} className="text-white text-2xl hover:text-gray-400">
            portfolio
          </a>
        </li>
        <li>
          <a href="#conoceme" onClick={openMenu} className="text-white text-2xl hover:text-gray-400">
            conoceme
          </a>
        </li>
        <li>
          <a href="#contacto" onClick={openMenu} className="text-white text-2xl hover:text-gray-400">
            contacto
          </a>
        </li>
      </motion.ul>
    )}
  </AnimatePresence>

  {/* Menú Desktop */}
  <ul className="hidden sm:flex sm:flex-row sm:gap-3 sm:items-center sm:justify-end">
    <li><a href="#home" className="text-white hover:text-gray-400">inicio</a></li>
    <li><a href="#portfolio" className="text-white hover:text-gray-400">portfolio</a></li>
    <li><a href="#conoceme" className="text-white hover:text-gray-400">conoceme</a></li>
    <li><a href="#contacto" className="text-white hover:text-gray-400">contacto</a></li>
  </ul>
</nav>

    </motion.section>
  );
};