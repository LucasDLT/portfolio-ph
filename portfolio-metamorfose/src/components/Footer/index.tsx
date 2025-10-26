// Footer.tsx
"use client";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full bg-transparent">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-around gap-4 text-white font-[family-name:var(--font-bellota)] text-[0.8rem] lg:text-[0.8rem] md:border-t border-white/10 border-none">
        {/* LEFT / Mobile top (copyright) -> Desktop left */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <p className="leading-none">
            © 2025 Metamorfose-ph. Todos los derechos reservados.
          </p>
          {/* Optional small legal / nit */}
          <p className="text-[0.7rem] text-white/70 mt-1 md:mt-0">
            Hecho con ♥ y fotografía
          </p>
        </div>
        {/* RIGHT / Mobile bottom (redes) -> Desktop right */}
        <div className="flex items-center justify-center md:justify-end gap-6 p-2">
          <h3>Contacto</h3>
          <a
            aria-label="Instagram Metamorfose (abre en nueva pestaña)"
            href="https://www.instagram.com/metamorfose.ph/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-1 rounded focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <Image
              src="/instagram-icon.png"
              alt="Instagram Metamorfose"
              width={30}
              height={30}
              className="hover:scale-110 transition-transform duration-200"
            />
          </a>

          <a
            aria-label="WhatsApp Metamorfose (abre en nueva pestaña)"
            href="https://wa.me/5491123456789?text=Hola%20quiero%20hacer%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-1 rounded focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <Image
              src="/whatsapp-icon.png"
              alt="WhatsApp Metamorfose"
              width={30}
              height={30}
              className="hover:scale-110 transition-transform duration-200"
            />
          </a>
        </div>

        <div className="flex flex-col items-center">
          <p className="flex items-center gap-2">
            Diseñado y Desarrollado por
            <a
              aria-label="Ir al perfil de LinkedIn de LsDev (abre en nueva pestaña)"
              className="ml-1 underline-offset-2 hover:underline animate-pulse focus:outline-none focus:ring-2 focus:ring-white/30 rounded-sm"
              href="https://www.linkedin.com/in/lucas-sebas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ls/Dev
            </a>
          </p>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Este sitio está protegido por reCAPTCHA y se aplican la
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300"
            >
              Política de Privacidad
            </a>
            y los
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300"
            >
              Términos de Servicio
            </a>
            de Google.
          </p>
        </div>
      </div>
    </footer>
  );
};
