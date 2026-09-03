import { z } from "zod";

/** Schema do formulário de contato — compartilhado entre client e server. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(120, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu email.")
    .email("Email inválido."),
  phone: z
    .string()
    .trim()
    .max(40, "Telefone muito longo.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais sobre o projeto (mín. 10 caracteres).")
    .max(2000, "Mensagem muito longa."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
