 import { Router } from "express";
 import ValidaLogin from "../controllers/crud/login";

const route = Router();

 route.post("/",ValidaLogin)
 


export default route
