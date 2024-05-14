import { Router } from "express";
import { upload } from "../multerConfig";
import { createCurriculo } from "../controllers/crud/curriculo_form";

const route = Router();

route.post('/',  upload.single('file'), createCurriculo);

export default route