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
    <div className="relative">
      <div className=" flex justify-between items-center">
        <div className="relative m-3 w-9 h-9 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10 2xl:w-10 2xl:h-10  ">
          <Image
            src={"/logo.png"}
            alt={"metamorfose-logo"}
            fill
            className="object-contain "
          />
        </div>
        <Navbar />
      </div>
      <div className="absolute w-[25%] h-[119%]  right-6">
        <Image
          src={"/camara-fondo.jpg"}
          alt={"metamorfose-fondo"}
          fill
          className="object-contain border mask-fade animate-pulse z-[-1]"
        />
      </div>
      <h1
        className="font-[family-name:var(--font-bellota)] font-bold
      mx-[10%] mt-[50%] text-4xl
      sm:text-7xl sm:mt-[30%] 
      md:text-7xl md:mt-[20%] 
      lg:text-8xl lg:mt-[15%]
      xl:text-9xl  xl:mt-[15%]
      2xl:text-9xl 2xl:mt-[16%]
      z-10
      "
      >
        METAMORFOSE PH
      </h1>

      <div className="mt-2 ml-[20%] flex justify-start items-center gap-[20rem]">
      <p className="text-2xl font-[family-name:var(--font-shadows)] tracking-widest}">
        Viviendo metamorfosis.
      </p>
      <ButtonContact />
      </div>
    </div>
  );
}

export const Navbar = () => {
  return (
    <nav className="font-[family-name:var(--font-shadows)] tracking-widest mr-4 flex justify-end">
      <ul className="flex gap-4">
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


export const ButtonContact = ()=>{
  return(
    <button className="font-[family-name:var(--font-bellota)] tracking-widest  p-2 border border-gray-200 rounded hover:bg-gray-300 hover:text-black duration-300 font-bold hover:scale-110 hover:font hover:cursor-pointer">
      Quiero una sesión 
    </button>
  )
}