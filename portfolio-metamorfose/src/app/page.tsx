"use client";
import { useContext } from "react";
import { Context } from "@/context/context";
import { HomeComponent } from "@/components/Home";
import { FotoComponent } from "@/components/PhotoSection";
import { Navbar } from "@/components/Navbar";
import { AboutComponent } from "@/components/About";

export default function Home() {
  const { fotos } = useContext(Context);

  return (
    <>
      <Navbar />
      <HomeComponent />
      <FotoComponent fotos={fotos} />
      <AboutComponent />


      
      <div id="contacto" className="h-[100vh]">
        <h1>CONTACTAME SECTION</h1>
      </div>
    </>
  );
}
