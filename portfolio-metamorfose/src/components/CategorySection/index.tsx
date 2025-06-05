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
        setFotos(category.images); // lógica original
        setActivo(category.name);  // ← nuevo: guardar cuál está activo
      }}
      className={`font-[family-name:var(--font-bellota)] tracking-widest transition-opacity duration-300 ${
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

//tengo que hacer un estado local o global para comunicarle desde este componente al fotoscomponent o biceversa buscar como seria, tal vez con un contexto para comunicarlos, y pasarle las fotos dentro de cada categorias a setFotos del fotoscomponent asi cada vez que se presione uno de estas categorias se actualizan las fotos y agregar un boton por default que cargue fotos nuevamente. 