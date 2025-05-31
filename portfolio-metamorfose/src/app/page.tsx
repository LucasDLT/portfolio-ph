"use client";
import { getCategories } from "@/helpers/getCategories";
import { getFotos } from "@/helpers/getFotos";
import { useEffect, useState } from "react";
import { Ifotos, ICategory } from "../types/types";
import Image from "next/image";
import Link from "next/link";

{
  /*export const FotoComponent: React.FC<{fotos: Ifotos[]}>  = ({fotos}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {fotos.map((foto) => {
        return (
          <div key={foto.id}>
            <Image
            src={foto.url}
            alt={foto.title}
            width={500}
            height={500}      
            className="object-cover w-full h-full"
              />
          </div>
        );
      })}
    </div>
  );
}

export const CategoryComponent: React.FC<{categories:ICategory[]}> = ({categories})=>{


  
  return(
    <div>
      {
        categories.map((category)=>{
          return(
            <div key={category.id}>
              <p>{category.name}</p>          
            </div>
          )
        })
      }
    </div>
  )
}





export default function Home() {
  const [fotos, setFotos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {  
    const foto = async () => getFotos();
    foto().then((fotos) => setFotos(fotos));

    const categorias = async () => getCategories();
    categorias().then((categorias) => setCategorias(categorias));

}, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">Metamorfosis</h1>
      <p className="text-2xl">Aqui se mostraran las fotos</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <FotoComponent fotos={fotos} />
      </div>

      <h1 className="text-4xl">Categorias</h1>
      <p className="text-2xl">Aqui se mostraran las categorias</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CategoryComponent categories={ categorias} />
      </div>
      
    </div>
  );
}*/
}

export default function Home() {
  return (
    <div  className=" relative z-0 overflow-x-hidden h-[100vh] w-screen">
      <div className=" flex justify-between items-center mt-[-10]">
        <div className="relative m-3 w-9 h-9 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10  xl:h-10 2xl:w-10 2xl:h-10">
          <Image
            src={"/logo.png"}
            alt={"metamorfose-logo"}
            fill
            className="object-contain "
          />
        </div>
        <Navbar />
      </div>
      <div className="fade-right transition-all duration-1000 ease-in-out absolute w-[70%] h-[80%] top-[15%] right-[15%] md:w-[40%] md:h-[110%] md:right-[-15%] md:top-[-10%] z-[-1] ">
        <Image
          src={"/camara-fondo.jpg"}
          alt={"metamorfose-fondo"}
          fill
          className="object-contain mask-fade"
        />
      </div>
      <div className="animate-reveal flex justify-center items-center sm:justify-start ">
      <h1
        style={{ textShadow: "3px 3px 5px #676767" }}
        className=" 
        font-[family-name:var(--font-bellota)] font-extrabold
      mt-[30%] text-[2.8rem] 
      sm:text-6xl sm:text-left sm:ml-15 sm:mt-[30%] 
      md:text-7xl md:mt-[20%] 
      lg:text-8xl lg:mt-[15%]
      xl:text-[9.5rem]  xl:mt-[15%]
      2xl:text-[9.5rem] 2xl:mt-[12%]
      z-10 masked-reveal
      ">
        METAMORFOSE PH
      </h1>
      
      </div>
      <div className="flex justify-center items-center sm:justify-start sm:ml-16 ">
        <p className="text-2xl font-[family-name:var(--font-shadows)] tracking-widest masked-reveal">
          Viviendo metamorfosis.
        </p>
      </div>
        <div className="flex justify-center items-center fade-button-in">
        <ButtonContact />
        </div>
        
    </div>
  );
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [labelButton, setLabelButton] = useState<string>("");

  useEffect(() => {
    isOpen ? setLabelButton(`x`) : setLabelButton(`≡`);
  }, [isOpen]);
  const openMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <nav className="relative z-10 font-[family-name:var(--font-shadows)] tracking-widest mt-[-8] mr-2 flex justify-end text-[0.9rem] ">
      <button
        onClick={openMenu}
        className={`hover:cursor-pointer top-6 text-white hover:text-gray-400 transition-all duration-300 ease-in-out text-xl mr-6 w-6 sm:hidden animate-pulse`}
      >
        {labelButton}
      </button>

      <ul
        className={`z-20 absolute gap-3 transform transition-all duration-300 ease-in-out
  flex flex-col justify-center items-centerm 
  sm:static sm:flex-row sm:opacity-100 sm:pointer-events-auto 
  ${
    isOpen
      ? "translate-y-10 justify-center items-center opacity-100 pointer-events-auto"
      : "translate-y-0 justify-center items-center opacity-0 pointer-events-none"
  }
  sm:translate-y-0`}
      >
        <Link className="text-white hover:text-gray-400 duration-300" href="/">
          inicio
        </Link>
        <Link className="text-white hover:text-gray-400 duration-300" href="/">
          portfolio
        </Link>
        <Link className="text-white hover:text-gray-400 duration-300" href="/">
          conoceme
        </Link>
        <Link className="text-white hover:text-gray-400 duration-300" href="/">
          contacto
        </Link>
      </ul>
    </nav>
  );
};

export const ButtonContact = () => {
  return (
      
    <button className="absolute font-[family-name:var(--font-bellota)] tracking-widest w-45 h-15 sm:w-50 sm:h-12 lg:w-45 lg:h-12 xl:w-50 xl:h-12 2xl:w-50  2xl:h-12  mt-[70%]  p-2  rounded bg-white text-black hover:text-white transition-all ease-in-out duration-600 font-extrabold hover:scale-102 hover:font-bold hover:cursor-pointer z-50 bg-swipe-hover sm:mt-[6%] masked-reveal">
      Quiero una sesión
    </button>
    
  );
};
