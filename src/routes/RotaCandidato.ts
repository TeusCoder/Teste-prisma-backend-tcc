import { Router } from "express";
import { createCandidato,findAllCandidatos, findOneCandidato } from "../controllers/crud/candidato";

const route = Router();

route.post("/", createCandidato)
// route.put("/update/:id_userCandidato", UpdateCandidato)
route.get("/findAll", findAllCandidatos)
route.get("/findOne/:id_userCandidato",findOneCandidato)

export default route