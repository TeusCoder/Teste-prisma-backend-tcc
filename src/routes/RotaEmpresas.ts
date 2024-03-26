import { Router } from "express";
import { CreateEmpresa, deleteEmpresa, findAllEmpresas, findOneEmpresa, UpdateEmpresa } from "../controllers/crud/empresa";

const route = Router();

route.post("/", CreateEmpresa)
route.put("/update", UpdateEmpresa)
route.get("/findAll", findAllEmpresas)
route.get("/findOne/:cnpj",findOneEmpresa)
route.delete("/delete/:cnpj", deleteEmpresa)


export default route