import { z } from "zod";

export const CurriculoFormSchema = z.object({
    escolaridade : z.string().min(1),
    experienciasAnt : z.string().min(1),
    competenciasExtracurricular : z.string().min(1),
    certificacoes: z.string().min(1)
})