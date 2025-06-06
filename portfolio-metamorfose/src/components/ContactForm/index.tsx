import { useState } from "react";
import { IMail, Ierror } from "@/types/types";
import { validateForm } from "@/helpers/validateForm";

export const ContactForm = () => {
  const [errors, setErrors] = useState<Ierror>({});
  const [form, setForm] = useState<IMail>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const PORT = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length) {
      console.log(validationErrors);
      return;
    }
    const { name, email, phone, message } = form;
    const formData = { name, email, phone, message };

    try {
      const response = await fetch(`${PORT}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      console.log(data);

      // Limpiar formulario
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="contacto" className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl mb-4">Contáctame</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-96 gap-2 p-4 border border-amber-50">
        <div>
          <label htmlFor="name">Nombre</label>
          <input name="name" id="name" type="text" onChange={handleChange} value={form.name} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Correo</label>
          <input type="email" name="email" id="email" onChange={handleChange} value={form.email} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone">Teléfono</label>
          <input type="tel" name="phone" id="phone" onChange={handleChange} value={form.phone} />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="message">Mensaje</label>
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={4}
            onChange={handleTextAreaChange}
            value={form.message}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>
        <button type="submit" className="bg-amber-400 py-1 rounded hover:bg-amber-500 transition-colors">
          Enviar
        </button>
      </form>
    </div>
  );
};
