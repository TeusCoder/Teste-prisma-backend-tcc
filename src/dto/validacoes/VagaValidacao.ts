import { z } from "zod";

export const VagaSchema = z.object({
    dataAbertura : z.date(),
    dataFechamento : z.date(),
    descricao : z.string().min(1),
    requisitos : z.string().min(1)
})