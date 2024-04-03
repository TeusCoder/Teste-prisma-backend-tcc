import { Router } from "express";
import { createCriaVaga, deleteVagaCriada, findAllCriaVaga, findOneVagaCriada, updateCriaVaga } from "../controllers/crud/criarVaga";


const route = Router();

route.post("/", createCriaVaga)
route.put("/update/:id_criaVaga", updateCriaVaga)
route.get("/findAll", findAllCriaVaga)
route.get("/findOne/:id_criaVaga", findOneVagaCriada)
route.delete("/delete/:id_criaVaga", deleteVagaCriada)

export default route;