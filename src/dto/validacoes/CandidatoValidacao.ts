import { z } from "zod";

export const candidatoSchema = z.object({
    id_user: z.string().uuid(),
    id_endereco: z.string().uuid(),
    nome : z.string().min(3),
    sobrenome : z.string().min(3),
    cpf : z.string().length(11),
    dataNascimento : z.string(), //formato (YYYY-MM-DD)
    telefone : z.string().length(11),
})