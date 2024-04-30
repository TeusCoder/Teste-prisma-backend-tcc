import { z } from "zod";

export const CurriculoFormSchema = z.object({
    id_userCandidato: z.string().uuid(),
    escolaridade : z.string().min(1),
    experienciasAnt : z.string().min(1),
    competenciasExtracurricular : z.string().min(1),
    certificacoes: z.string().min(1),
    curriculo_anexo: z.string()
})