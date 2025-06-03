"use client";
import { useState, useEffect, ReactNode, createContext } from "react";
import { Ifotos, ICategory } from "@/types/types";
import { getFotos } from "@/helpers/getFotos";
import { getCategories } from "@/helpers/getCategories";

interface IContext {
  fotos: Ifotos[] | [];
  setFotos: (fotos: Ifotos[]) => void;
  categorias: ICategory[] | [];
  setCategorias: (categorias: ICategory[]) => void;
}
interface IProvider {
  children: ReactNode;
}
export const Context = createContext<IContext>({
  fotos: [],
  setFotos: () => {},
  categorias: [],
  setCategorias: () => {},
});
export const ContextProvider = ({ children }: IProvider) => {
  const [fotos, setFotos] = useState<Ifotos[]>([]);
  const [categorias, setCategorias] = useState<ICategory[]>([]);

  useEffect(() => {
    const foto = async () => getFotos();
    foto().then((fotos) => setFotos(fotos));

    const categorias = async () => getCategories();
    categorias().then((categorias) => setCategorias(categorias));
  }, []);

  const value = { fotos, categorias, setFotos, setCategorias };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
