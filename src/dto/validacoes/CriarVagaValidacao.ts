import { string, z } from "zod";

export const  CriaVagaSchema = z.object({
    id_userEmpresa: z.string().uuid(),
    id_vaga : z.string().uuid(),
    dataCriacao : z.date()
})