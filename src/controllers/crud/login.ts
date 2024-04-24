import express, { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithRequest} from 'passport-jwt';
import passport from 'passport'
import jwt from 'jsonwebtoken';
import { candidatoSchema } from '../../dto/validacoes/CandidatoValidacao';

const login = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET || 'secret'

const jwtOptions ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: jwtSecret,
    passReqToCallback:true
};

passport.use(new JwtStrategy(jwtOptions as StrategyOptionsWithRequest, async (req:Request, jwtPayload, done)=>{
     const url = req.method + ' ' + req.baseUrl + req.url
    console.log("user: ", jwtPayload.sub, " - url: - ", url )
    if (jwtPayload.type === 0) {
      done(null, { id: candidatoSchema });  // error first pattern
    } else {
      done(null, false);
}
}))

//funcão para validar usuario ex:localhost:3000/login/loginUsuario?email=teste@gmail.com&password=12345678
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
            const token = jwt.sign({sub:email, type:0 }, jwtSecret,
                {
                    expiresIn: '1m'
                })
                
            return res.status(200).json({token, message: 'Credenciais válidas.', userId: user.id_userCandidato });
    
        }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Erro ao verificar credenciais.' });
    }
};
//rota para validar login da empresa ex:localhost:3000/login/loginEmpresa?email=teste@gmail.com&password=12345678
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
            const token = jwt.sign({sub:email, type:0 }, jwtSecret,
                {
                    expiresIn: '1m'
                })
            
            return res.status(200).json({token, message: 'Credenciais válidas.', userId: user.id_userEmpresa });
    
        }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Erro ao verificar credenciais.' });
    }
};


export {ValidaLoginUsuario, ValidaLoginEmpresa} 