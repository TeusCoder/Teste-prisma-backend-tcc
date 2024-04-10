import { Router } from "express";
import { upload } from "../multerConfig";

const route = Router();

route.post('/', upload.single('file'), (req, res) => {
    res.send('Arquivo enviado com sucesso!');
  });

export default route