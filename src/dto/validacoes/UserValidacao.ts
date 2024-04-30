import { z } from "zod";

export const UserSchema = z.object({
    email : z.string().email(),
    senha : z.string().min(3),
    tipo : z.string(),
    status : z.number()
})