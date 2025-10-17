import { useContext, useState } from "react";
import { Context } from "@/context/context";


export const CategoryComponent = ( ) => {
const { categorias, setFotos, prevFotos  } = useContext(Context);
const [activo, setActivo] = useState<string | null>(null);


  return (
    <div className="mx-4">
      <button onClick={(e)=>{e?.preventDefault();
      setActivo("PORTFOLIO");setFotos(prevFotos)}} className={`font-[family-name:var(--font-bellota)] transition-opacity duration-300 ${activo === 
      "PORTFOLIO" ? "opacity-100" : "opacity-60"
      } `} tracking-widest>PORTFOLIO</button>
{categorias.map((category) => (
  <div key={category.id}>
    <button
      onClick={(e) => {
        e.preventDefault();
        setFotos(category.images); 
        setActivo(category.name);  
      }}
      className={`font-[family-name:var(--font-bellota)] tracking-wider transition-opacity duration-300 ${
        activo === category.name ? "opacity-100" : "opacity-60"
      }`}
    >
      {category.name}
    </button>
  </div>
))}

    </div>
  );
};

