import { Router } from "express";
import { createEndereco, deleteEndereco, findAllEnderecos, findOneEndereco, UpdateEndereco } from "../controllers/crud/endereco";

const route = Router();

route.post("/", createEndereco)
route.put("/update/:id_endereco", UpdateEndereco)
route.get("/findAll", findAllEnderecos)
route.get("/findOne/:cep",findOneEndereco)
route.delete("/delete/:id_endereco", deleteEndereco)

export default route;