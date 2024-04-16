import { Router } from "express";
import { createCandidato, deleteCandidato,findAllCandidatos, findOneCandidato, UpdateCandidato } from "../controllers/crud/candidato";

const route = Router();

route.post("/", createCandidato)
// route.post("/teste", isValid)
route.put("/update/:email", UpdateCandidato)
route.get("/findAll", findAllCandidatos)
route.get("/findOne/:cpf",findOneCandidato)
route.delete("/delete/:cpf", deleteCandidato)

export default route