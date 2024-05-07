 import { Router } from "express";
 import ValidaLogin from "../controllers/crud/login";

const route = Router();

 route.get("/",ValidaLogin)
 


export default route
