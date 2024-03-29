import { Router } from "express";
import { createCandidato, deleteCandidato, exemplo, findAllCandidatos, findOneCandidato, isValid, UpdateCandidato } from "../controllers/crud/candidato";

const route = Router();


route.post("/", createCandidato)
// route.post("/teste", isValid)
route.put("/update", UpdateCandidato)
route.get("/findAll", findAllCandidatos)
route.get("/findOne/:cpf",findOneCandidato)
route.delete("/delete/:cpf", deleteCandidato)
route.post("/teste", exemplo)

export default route