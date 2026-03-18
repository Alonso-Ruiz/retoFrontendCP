import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Correo electrónico no válido" }),
  fullName: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
});

export const paymentSchema = z.object({
  // Tarjeta
  cardNumber: z.string().regex(/^\d{16}$/, { message: "La tarjeta debe tener exactamente 16 dígitos numéricos, sin espacios" }),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Formato inválido. Use MM/YY" }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "El CVV debe tener 3 o 4 dígitos" }),
  
  // Personales
  email: z.string().email({ message: "Correo electrónico no válido" }),
  fullName: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  documentType: z.enum(["DNI", "CE", "Pasaporte"], { message: "Seleccione un tipo de documento" }),
  documentNumber: z.string().min(1, "Este campo es requerido")
}).superRefine((data, ctx) => {
  if (data.documentType === "DNI") {
    if (!/^\d{8}$/.test(data.documentNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El DNI debe tener exactamente 8 dígitos numéricos",
        path: ["documentNumber"],
      });
    }
  } else {
    // CE o Pasaporte
    if (data.documentNumber.length < 8 || data.documentNumber.length > 12) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `El documento ${data.documentType} debe tener entre 8 y 12 caracteres`,
        path: ["documentNumber"],
      });
    }
  }
});
