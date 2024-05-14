import fs from 'fs';
import crypto from 'crypto';


import { PrismaClient } from "@prisma/client";
import e, { Request, Response } from "express";
import { CurriculoFormSchema } from "../../dto/validacoes/Curriculo_formValidacao";

const Curriculo = new PrismaClient();

async function createCurriculo(req: Request, res: Response) {

    const encryptFile = (entrada: fs.PathLike, saida: fs.PathLike, callback: any) => {
        const algorithm = 'aes-256-cbc';
        const key = crypto.randomBytes(32); // Chave de 256 bits
        const iv = crypto.randomBytes(16); // Vetor de inicialização de 16 bytes

        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const input = fs.createReadStream(entrada);
        const output = fs.createWriteStream(saida);

        input.pipe(cipher).pipe(output);

        output.on('finish', () => {
            callback(null, { key: key.toString('hex'), iv: iv.toString('hex') });
        });

        output.on('error', (err) => {
            callback(err);
        });
    };

    const uploadFile = async (req: { file: { path: any; }; body: { id_userCandidato: any; nomeEmpresa: any; cargo: any; periodo: any; realizacoes: any; instituicao: any; grau: any; campoEstudo: any; periodoEstudo: any; competenciasExtracurricular: any; certificacoes: any; }; }, res: Response) => {
        const filePath = req.file.path;
        const encryptedFilePath = filePath + '.enc';

        encryptFile(filePath, encryptedFilePath, async (err: any, encryptionInfo: any) => {
            if (err) {
                console.error('Erro ao criptografar o arquivo:', err);
                return res.status(500).send('Erro ao criptografar o arquivo');
            }

            fs.unlink(filePath, async (err) => {
                if (err) {
                    console.error('Erro ao excluir o arquivo original:', err);
                    return res.status(500).send('Erro ao excluir o arquivo original');
                }
            })
        })
    };

    try {
        const {
            id_userCandidato,
            nomeEmpresa,
            cargo,
            periodo,
            realizacoes,
            instituicao,
            grau,
            campoEstudo,
            periodoEstudo,
            competenciasExtracurricular,
            certificacoes
        } = req.body;
        //verificação pelo zod
        CurriculoFormSchema.parse({
            id_userCandidato, nomeEmpresa, cargo, periodo, realizacoes, instituicao,
            grau, campoEstudo, periodoEstudo, competenciasExtracurricular, certificacoes
        });


        const uploadFile = async (req: { file: { path: any; }; body: { id_userCandidato: any; nomeEmpresa: any; cargo: any; periodo: any; realizacoes: any; instituicao: any; grau: any; campoEstudo: any; periodoEstudo: any; competenciasExtracurricular: any; certificacoes: any; }; }, res: Response) => {
            const filePath = req.file.path;
            const encryptedFilePath = filePath + '.enc';

        const createdCurriculo = await Curriculo.curriculo_form.create({
            data: {
                id_userCandidato,
                nomeEmpresa,
                cargo,
                periodo,
                realizacoes,
                instituicao,
                grau,
                campoEstudo,
                periodoEstudo,
                competenciasExtracurricular,
                certificacoes,
                curriculo_anexo: encryptedFilePath
            }
        })
    };
        res.status(201).json({ message: 'Arquivo enviado, criptografado e caminho salvo com sucesso'});
    } catch (error) {
        console.log('Erro ao salvar no banco de dados', error);
    }
    module.exports = { uploadFile };
}

// async function updateCurriculo(req: Request, res: Response) {
//     try {
//         const { id_curriculoForm } = req.params;
//         const { escolaridade } = req.body;

//         const curriculoUpdated = await Curriculo.curriculo_form.update({
//             where: { id_curriculoForm },
//             data: { escolaridade }
//         });
//         res.status(200).json(curriculoUpdated);
//     } catch (error) {
//         console.log(error);
//     }
// }

async function findAllCurriculos(req: Request, res: Response) {
    try {
        const Curriculos = await Curriculo.curriculo_form.findMany();
        res.status(200).json(Curriculos);
    } catch (error) {
        console.log(error);
    }
}

async function findOneCurriculo(req: Request, res: Response) {
    try {
        const { id_curriculoForm } = req.params;
        const CurriculoExistente = await Curriculo.curriculo_form.findFirst({
            where: { id_curriculoForm }
        })
        if (!CurriculoExistente) {
            res.status(404).send("CV não encontrado");
        } else {
            res.status(200).json(CurriculoExistente)
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteCurriculo(req: Request, res: Response) {
    try {
        const { id_curriculoForm } = req.params;
        if (!id_curriculoForm) {
            res.status(400).send("Verifique o id na url");
        } else {
            const CvDeletado = await Curriculo.curriculo_form.delete({ where: { id_curriculoForm } })
            res.status(200).end("CV deletado");
        }
    } catch (error) {
        console.log(error);
    }
}

export { createCurriculo, findAllCurriculos, findOneCurriculo, deleteCurriculo }