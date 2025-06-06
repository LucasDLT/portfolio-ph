import { Ierror } from "@/types/types";

export function validateForm(error:Ierror) {
    const errors = {} as Ierror;
    if (error.name === "") {
        errors.name = "El nombre es requerido";
    }
    if (error.email === "") {
        errors.email = "El correo es requerido";
    }
    
    if (error.message === "") {
        errors.message = "El mensaje es requerido";
    }
    return errors;
}