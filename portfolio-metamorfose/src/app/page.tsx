"use client";
import { useContext } from "react";
import { Context } from "@/context/context";
import { HomeComponent } from "@/components/Home";
import { FotoComponent } from "@/components/PhotoSection";
import { CategoryComponent } from "@/components/CategorySection";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const {fotos, categorias} = useContext(Context)

  return (
    <>
      <Navbar />
      <HomeComponent />

        <FotoComponent fotos={fotos} />
        <h1 className="text-4xl">Categorias</h1>
        <p className="text-2xl">Aqui se mostraran las categorias</p>
        <div className="">
          <CategoryComponent categories={categorias} />
        </div>
        <div id="conoceme" className="h-[100vh]">
          <h1>CONOCEME SECTION</h1>
        </div>
        <div id="contacto" className="h-[100vh]">
          <h1>CONTACTAME SECTION</h1>
        </div>
    </>
  );
}
