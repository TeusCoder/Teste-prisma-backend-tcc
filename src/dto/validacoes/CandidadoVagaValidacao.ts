import {z} from "zod";

export const candidatoVagaSchema = z.object({
    id_userCandidato: z.string().uuid(),
    id_vaga : z.string().uuid(),
    dataInscricao: z.string()
})