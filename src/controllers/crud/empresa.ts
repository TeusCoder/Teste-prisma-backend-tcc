import {PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const UserEmpresa = new PrismaClient()

async function CreateEmpresa(req: Request, res: Response) {
   try {
    const { 
        razaoSocial,
        fantasia,
        cnpj,
        ie,
        email,
        senha} = req.body;

        const createdEmpresa = await UserEmpresa.userEmpresa.create({
            data: {
                razaoSocial: razaoSocial,
                fantasia: fantasia,
                cnpj: cnpj,
                ie: ie,
                email: email,
                senha: senha
            }
        })

        res.json(createdEmpresa)
    
   } catch (err) {
    throw new Error(err.message)
    
   } 
}

export {CreateEmpresa}

