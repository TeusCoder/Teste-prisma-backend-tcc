import { z } from "zod"

export const EmpresaSchema = z.object({
    id_endereco : z.string().uuid(),
    razaoSocial: z.string().min(1),
    nome_fantasia : z.string().min(1),
    cnpj : z.string().length(14),
    ie: z.string().min(9),
    telefone : z.string().length(11),
    email : z.string().email(),
    senha : z.string().min(5)
})