import { useState, useEffect } from "react";
import { IMail, Ierror } from "@/types/types";
import { validateForm } from "@/helpers/validateForm";
import Image from "next/image";
import { toast } from "sonner";
import BackgroundEntrance from "@/components/BackgroundAnimate";

// Tipado global de reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}
export const ContactForm = () => {
  const [errors, setErrors] = useState<Ierror>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [form, setForm] = useState<IMail>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
 
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const PORT = process.env.NEXT_PUBLIC_API_URL;
  const SITE_KEY_RECAPTCHA = process.env.NEXT_PUBLIC_SITE_KEY_RECAPTCHA!;

  // ---------------- Cargar script de reCAPTCHA ----------------
  useEffect(() => {
    if (!SITE_KEY_RECAPTCHA) {
      console.warn("No existe NEXT_PUBLIC_SITE_KEY_RECAPTCHA en el env.");
      return;
    }

    if (window.grecaptcha) {
      setRecaptchaReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY_RECAPTCHA}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Esperar a que grecaptcha esté listo
      window.grecaptcha.ready(() => {
        setRecaptchaReady(true);
      });
    };

    script.onerror = () => {
      console.error("Error cargando el script de reCAPTCHA");
      setRecaptchaReady(false);
    };

    document.head.appendChild(script);

    // cleanup opcional
    return () => {
      // document.head.removeChild(script);
    };
  }, [SITE_KEY_RECAPTCHA]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualizar el form
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validar en tiempo real
    const updatedForm = { ...form, [name]: value };
    const validationErrors = validateForm(updatedForm);
    setErrors(validationErrors);
  };

  // ---------------- Obtener token de reCAPTCHA ----------------
  const getRecaptchaToken = (
    action = "contact",
    timeoutMs = 8000
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha || !window.grecaptcha.execute) {
        return reject(new Error("reCAPTCHA no está listo"));
      }

      let finished = false;
      const timer = setTimeout(() => {
        if (!finished) {
          finished = true;
          reject(new Error("reCAPTCHA timeout"));
        }
      }, timeoutMs);

      try {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(SITE_KEY_RECAPTCHA, { action })
            .then((token: string) => {
              if (finished) return;
              finished = true;
              clearTimeout(timer);
              resolve(token);
            })
            .catch((err: Error) => {
              if (finished) return;
              finished = true;
              clearTimeout(timer);
              reject(err);
            });
        });
      } catch (err) {
        if (!finished) {
          finished = true;
          clearTimeout(timer);
          reject(err);
        }
      }
    });
  };

  const handleTextAreaChange = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    // 🔒 Si hay errores, no sigas
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );
    if (hasErrors) {
      return; // Detiene el envío
    }
    const { name, email, phone, message } = form;

    try {
      if (!recaptchaReady) {
        return;
      }

      const token = await getRecaptchaToken("contact");

      const payload = {
        name,
        email,
        phone,
        message,
        recaptcha: token,
      };
      console.log("Payload enviado al backend:", payload);

      const response = await fetch(`${PORT}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      console.log(data);
      toast.success("Correo enviado con exito");

      // Limpiar formulario
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al enviar el correo");
    }
  };

  return (
    <BackgroundEntrance>
      <div
        id="contacto"
        className="h-[90vh] z-100 flex items-start justify-evenly "
      >
        <form
          onSubmit={handleSubmit}
          className={`fade-to-black flex flex-col justify-between gap-2 p-4  h-[30rem] w-96 mt-30 font-[family-name:var(--font-bellota)]`}
        >
          <div className="flex flex-col text-center">
            <label htmlFor="name">Nombre</label>
            <input
              className="border rounded mb-2"
              name="name"
              id="name"
              type="text"
              onChange={handleChange}
              value={form.name}
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="flex flex-col text-center ">
            <label htmlFor="email">Correo</label>
            <input
              className="border rounded"
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={form.email}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col text-center ">
            <label htmlFor="phone">Teléfono</label>
            <input
              className="border rounded"
              type="tel"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={form.phone}
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="flex flex-col text-center ">
            <label htmlFor="message">Mensaje</label>
            <textarea
              className="border rounded"
              name="message"
              id="message"
              cols={30}
              rows={4}
              onChange={handleTextAreaChange}
              value={form.message}
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-sm">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-gray-600 text-white py-1 rounded hover:bg-gray-500 transition-colors"
          >
            Enviar
          </button>
        </form>

        <section
          className={`relative fade-to-top flex flex-col items-center justify-between gap-2 p-4 rounded h-[30rem] w-96 mt-30 font-[family-name:var(--font-bellota)] `}
        >
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequatur mollitia magni veniam repellendus ipsam libero quam
            doloremque. Consequuntur sint deserunt nihil blanditiis vero impedit
            qui ad, dignissimos culpa, perspiciatis ut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            tempora amet enim excepturi obcaecati in incidunt veritatis, fugit
            alias pariatur laboriosam possimus doloribus totam aperiam
            recusandae vel, corporis ad dolores.
          </p>
          <div className="flex justify-evenly items-center gap-1 w-80 ">
            <a
              href="https://www.instagram.com/metamorfose.ph/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instagram-icon.png"
                alt="logo"
                width={40}
                height={40}
              ></Image>
            </a>

            <a
              href="https://wa.me/5491123456789?text=Hola%20quiero%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/whatsapp-icon.png"
                alt="logo"
                width={40}
                height={40}
              ></Image>
            </a>
          </div>
        </section>
      </div>
      <footer className="flex justify-center items-center text-white font-[family-name:var(--font-bellota)] font-2xl">
        <p>© 2025 Metamorfose-ph. Todos los derechos reservados.</p>
        <p>
          Diseñado y Desarrollado por{" "}
          <a
            className="animate-pulse"
            href="https://www.linkedin.com/in/lucas-sebas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ls/Dev
          </a>
        </p>
      </footer>
    </BackgroundEntrance>
  );
};
