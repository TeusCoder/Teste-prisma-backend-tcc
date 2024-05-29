import { Router } from "express";
import { CreateEmpresa,UpdateEmpresa, findAllEmpresas, findOneEmpresa } from "../controllers/crud/empresa";

const route = Router();

route.post("/", CreateEmpresa)
route.put("/update/:id_userEmpresa", UpdateEmpresa)
route.get("/findAll", findAllEmpresas)
route.get("/findOne/:id_user",findOneEmpresa)


export default route