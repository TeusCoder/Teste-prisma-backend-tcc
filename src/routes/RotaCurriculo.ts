import { Router } from "express";
import { createCurriculo, deleteCurriculo, findAllCurriculos, findOneCurriculo } from "../controllers/crud/curriculo_form";
import { upload } from "../multerConfig";

const route = Router();

route.post("/", upload.single('file'), (req, res) => {res.send('Arquivo enviado com sucesso!')}, createCurriculo)
// route.put("/update/:id_curriculoForm", updateCurriculo)
route.get("/findAll", findAllCurriculos)
route.get("/findOne/:id_curriculoForm", findOneCurriculo)
route.delete("/delete/:id_curriculoForm", deleteCurriculo)

export default route