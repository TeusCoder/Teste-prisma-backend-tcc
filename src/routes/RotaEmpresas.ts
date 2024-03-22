import { Router } from "express";
import { CreateEmpresa } from "../controllers/crud/empresa";

const route = Router();


route.post("/", CreateEmpresa)

export default route