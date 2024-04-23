import { Router } from "express";
import { CreateEmpresa, deleteEmpresa, findAllEmpresas, findOneEmpresa, UpdateEmpresa } from "../controllers/crud/empresa";

const route = Router();

route.post("/", CreateEmpresa)
route.put("/update/:id_userEmpresa", UpdateEmpresa)
route.get("/findAll", findAllEmpresas)
route.get("/findOne/:id_userEmpresa",findOneEmpresa)
route.delete("/delete/:id_userEmpresa", deleteEmpresa)


export default route