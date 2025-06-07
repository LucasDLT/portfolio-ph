import { Ierror, IMail } from "@/types/types";

export function validateForm(form: IMail): Ierror {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors: Ierror = {
      name: "",
      email: "",
      phone: "",
      message: ""
  };

  // Validación nombre
  if (!form.name.trim()) {
    errors.name = "El nombre es requerido";
  } else if (form.name.length > 10) {
    errors.name = "El nombre debe tener menos de 10 caracteres";
  } else if (/\d/.test(form.name)) {
    errors.name = "El nombre no puede contener números";
  } else if (form.name.includes(" ")) {
    errors.name = "El nombre no puede contener espacios";
  }

  // Validación email
  if (!form.email.trim()) {
    errors.email = "El correo es requerido";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "El correo no es válido";
  }

  // Validación teléfono
  if (!form.phone.trim()) {
    errors.phone = "El teléfono es requerido";
  } else if (form.phone.length < 10) {
    errors.phone = "El teléfono debe tener menos de 10 caracteres";
  } else if (!/^\d+$/.test(form.phone)) {
    errors.phone = "El teléfono solo debe contener números";
  } else if (form.phone.includes(" ")) {
    errors.phone = "El teléfono no puede contener espacios";
  }

  // Validación mensaje
  if (!form.message.trim()) {
    errors.message = "El mensaje es requerido";
  }

  return errors;
}
