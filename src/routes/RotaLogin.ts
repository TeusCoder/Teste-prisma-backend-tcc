import { Router } from "express";
import { ValidaLoginEmpresa, ValidaLoginUsuario } from "../controllers/crud/login";

const route = Router();

route.get("/loginEmpresa",ValidaLoginEmpresa)
route.get("/loginUsuario",ValidaLoginUsuario)


export default route