'use client'
import { getCategories } from "@/helpers/getCategories";
import { getFotos } from "@/helpers/getFotos";
import { useEffect, useState } from "react";
import {Ifotos, ICategory} from '../types/types'
import Image from "next/image";

export const FotoComponent: React.FC<{fotos: Ifotos[]}>  = ({fotos}) => {
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
}
