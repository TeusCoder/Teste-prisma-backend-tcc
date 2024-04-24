import { Router } from "express";
import { createCandidato, deleteCandidato,findAllCandidatos, findOneCandidato, UpdateCandidato } from "../controllers/crud/candidato";

const route = Router();

route.post("/", createCandidato)
// route.post("/teste", isValid)
route.put("/update/:id_userCandidato", UpdateCandidato)
route.get("/findAll", findAllCandidatos)
route.get("/findOne/:id_userCandidato",findOneCandidato)
route.delete("/delete/:id_userCandidato", deleteCandidato)

export default route