import { Request, Response, Router } from "express";
import { upload } from "../multerConfig";
import { PrismaClient } from "@prisma/client";

const CV = new PrismaClient();

const route = Router();

route.post('/', upload.single('cv'));

route.put('/',
async (req: Request, res: Response) => {
    try {
        const { id_curriculoForm } = req.params;
        const filePath = req.file?.path;

        const updateCurriculoAnexo = await CV.curriculo_form.update({
            where: { id_curriculoForm },
            data: { curriculo_anexo: filePath }
        })
        res.status(200).json({ message: 'Arquivo enviado e caminho salvo com sucesso!' });
    } catch (error) {
        console.log(error);
    }
})

export default route