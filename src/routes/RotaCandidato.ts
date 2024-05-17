import { Router } from "express";
import { createCandidato,UpdateCandidato,findAllCandidatos, findOneCandidato } from "../controllers/crud/candidato";

const route = Router();

route.post("/", createCandidato)
route.put("/update/:id_userCandidato", UpdateCandidato)
route.get("/findAll", findAllCandidatos)
route.get("/findOne/:id_user",findOneCandidato)

export default route
