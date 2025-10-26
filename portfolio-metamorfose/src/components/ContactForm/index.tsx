import { useState, useEffect } from "react";
import { IMail, Ierror } from "@/types/types";
import { validateForm } from "@/helpers/validateForm";
import { toast } from "sonner";
import BackgroundEntrance from "@/components/BackgroundAnimate";
import { Loader } from "../Loader";

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
  const [loading, setLoading] = useState<boolean>(false);

  const PORT = process.env.NEXT_PUBLIC_API_URL;
  const SITE_KEY_RECAPTCHA = process.env.NEXT_PUBLIC_SITE_KEY_RECAPTCHA!;

  // ---------------- Cargar script de reCAPTCHA ----------------
  useEffect(() => {
    if (!SITE_KEY_RECAPTCHA) {
      console.warn("No existe NEXT_PUBLIC_SITE_KEY_RECAPTCHA en el env.");
      return;
    }

    if ((window).grecaptcha) {
      setRecaptchaReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY_RECAPTCHA}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.grecaptcha?.ready(() => {
        setRecaptchaReady(true);
      });
    };

    script.onerror = () => {
      console.error("Error cargando el script de reCAPTCHA");
      setRecaptchaReady(false);
    };

    document.head.appendChild(script);

    return () => {
      // limpiar script si se desmonta
      try {
        document.head.removeChild(script);
      } catch {
        /* noop */
      }
    };
  }, [SITE_KEY_RECAPTCHA]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    const updatedForm = { ...form, [name]: value };
    const validationErrors = validateForm(updatedForm);
    setErrors(validationErrors);
  };

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

// reemplaza tu handleTextAreaChange por esta versión
const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  // actualizar form
  setForm((prev) => ({ ...prev, [name]: value }));

  // validar con el nuevo valor (usamos snapshot combinando prev form y nuevo value)
  const updatedForm = { ...form, [name]: value };
  const validationErrors = validateForm(updatedForm);
  setErrors(validationErrors);
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // prevenir doble submit
    if (loading) return;

    // validación previa
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );
    if (hasErrors) {
      toast.error("Por favor completa los campos correctamente.");
      return;
    }

    setLoading(true);
    // opcional: bloquear scroll global mientras se envía
    document.body.style.overflow = "hidden";

    try {
      if (!recaptchaReady) {
        toast.error("reCAPTCHA no está listo, intentá nuevamente en un momento.");
        return;
      }

      const token = await getRecaptchaToken("contact");

      const { name, email, phone, message } = form;
      const payload = {
        name,
        email,
        phone,
        message,
        recaptcha: token,
      };

      const response = await fetch(`${PORT}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // intentá leer error del body si lo hay
        let serverMessage = "Error en la petición";
        try {
          const json = await response.json();
          if (json?.message) serverMessage = json.message;
        } catch {
          /* noop */
        }
        throw new Error(serverMessage);
      }

      await response.json();
      toast.success("Correo enviado con éxito");

      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar el correo. Intentá más tarde.");
    } finally {
      // siempre limpiar loading y scroll lock
      setLoading(false);
      document.body.style.overflow = "";
    }
  };

  return (
    <BackgroundEntrance>
      <div
        id="contacto"
        className="h-[90vh] z-100 flex flex-col items-center justify-evenly relative"
      >
        <form
          onSubmit={handleSubmit}
          className={`relative fade-to-black flex flex-col justify-between gap-2 p-4  h-[30rem] w-96 mt-30 font-[family-name:var(--font-bellota)]`}
          aria-busy={loading}
        >
          {/* overlay loader dentro del form */}
          {loading && (
            <div
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded"
              aria-hidden="true"
            >
              <Loader />
            </div>
          )}

          <div className="flex flex-col text-center">
            <label htmlFor="name">Nombre</label>
            <input
              className="border rounded mb-2"
              name="name"
              id="name"
              type="text"
              onChange={handleChange}
              value={form.name}
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-sm">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="relative flex items-center justify-center bg-gray-600 text-white py-1 rounded hover:bg-gray-500 transition-colors disabled:opacity-60"
            disabled={loading}
            aria-disabled={loading}
          >
            {/* show small loader inside button if loading */}
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="sr-only">Enviando</span>
                <Loader />
                <span>Enviando...</span>
              </span>
            ) : (
              "Enviar"
            )}
          </button>
        </form>


      </div>
    </BackgroundEntrance>
  );
};
