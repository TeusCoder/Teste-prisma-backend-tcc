import { Router } from "express";
import { CreateInscricaoCandVaga, deleteInscricao, findAllInscricoes, findOneInscricao, updateInscricao } from "../controllers/crud/candidatoVaga";


const route = Router();

route.post("/", CreateInscricaoCandVaga)
route.put("/update/:id_inscricao", updateInscricao)
route.get("/findAll", findAllInscricoes)
route.get("/findOne/:id_inscricao",findOneInscricao)
route.delete("/delete/:id_inscricao", deleteInscricao)

export default route;