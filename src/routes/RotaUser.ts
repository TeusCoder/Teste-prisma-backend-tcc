import { Router } from "express";
import { createUser, deleteUser, findAllUsers, findOneUser, updateUser } from "../controllers/crud/user";

const route = Router();

route.post("/", createUser)
route.put("/update/:id_user",updateUser)
route.get("/findAll", findAllUsers)
route.get("/findOne/:id_user", findOneUser)
route.delete("/delete/:id_user", deleteUser)

export default route