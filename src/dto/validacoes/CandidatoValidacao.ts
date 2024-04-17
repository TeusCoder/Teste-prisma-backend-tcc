import { z } from "zod";

export const candidatoSchema = z.object({
    id_endereco: z.string().uuid(),
    id_curriculoForm : z.string().uuid(),
    nome : z.string().min(3),
    sobrenome : z.string().min(3),
    cpf : z.string().length(11),
    dataNascimento : z.date(), //formato (YYYY-MM-DD)
    email : z.string().email(),
    telefone : z.string().length(11),
    curriculo_anexo : z.string(),
    senha : z.string().min(5)
})