import { Router } from "express";
import { createCurriculo, deleteCurriculo, findAllCurriculos, findOneCurriculo, updateCurriculo } from "../controllers/crud/curriculo_form";

const route = Router();

route.post("/", createCurriculo)
route.put("/update/:id_curriculoForm", updateCurriculo)
route.get("/findAll", findAllCurriculos)
route.get("/findOne/:id_curriculoForm", findOneCurriculo)
route.delete("/delete/:id_curriculoForm", deleteCurriculo)

export default route