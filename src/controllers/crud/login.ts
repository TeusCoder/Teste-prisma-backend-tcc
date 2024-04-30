import express, { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// const login = new PrismaClient();

async function ValidaLoginUsuario(req:Request, res:Response){
   
    try{
     const {
        email,
        senha
     } = req.query;
     const user = await login.userCandidato.findUnique({
        where:{
            email: String(email),
        },
     });
        if(!user){
            return res.status(404).json({message:'Email inválido'})
        }
        const validaSenha = await bcrypt.compare(String(senha), user.senha);
        if(!validaSenha){
            return res.status(401).json({ message: 'Senha incorreta.' });
        }else{
            return res.status(200).json({ message: 'Credenciais válidas.', userId: user.id_userCandidato });
    
//         }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Erro ao verificar credenciais.' });
    }
};

async function ValidaLoginEmpresa(req:Request, res:Response){
   
    try{
     const {
        email,
        senha
     } = req.query;
     const user = await login.userEmpresa.findUnique({
        where:{
            email: String(email),
        },
     });
        if(!user){
            return res.status(404).json({message:'Email inválido'})
        }
        const validaSenha = await bcrypt.compare(String(senha), user.senha);
        if(!validaSenha){
            return res.status(401).json({ message: 'Senha incorreta.' });
        }else{
            return res.status(200).json({ message: 'Credenciais válidas.', userId: user.id_userEmpresa });
    
//         }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Erro ao verificar credenciais.' });
    }
};

// export {ValidaLoginUsuario, ValidaLoginEmpresa} 