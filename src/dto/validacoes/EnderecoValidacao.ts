import { z } from "zod";

export const EnderecoSchema = z.object({
    pais : z.string().min(2),
    estado : z.string().min(2),
    cidade : z.string().min(3),
    bairro : z.string().min(4),
    logradouro : z.string(),
    numero: z.string().min(1),
    cep: z.string().length(8)
})