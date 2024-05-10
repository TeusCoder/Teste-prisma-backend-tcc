import express, { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithRequest} from 'passport-jwt';
import passport from 'passport'
import jwt from 'jsonwebtoken';
import { candidatoSchema } from '../../dto/validacoes/CandidatoValidacao';

const login = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET || 'secret' //colocar no .env --> JWT_SECRET= '***'<-- uma senha segura

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

//funcão para validar usuario ex:localhost:3000/login?email=teste@gmail.com&password=12345678
async function ValidaLogin(req:Request, res:Response){
   
    try{
     const {
        email,
        senha
     } = req.query;
     const validar = await login.user.findUnique({
        where:{
            email: String(email),
        },
     });
        if(!validar){
            return res.status(404).json({message:'Email inválido'})
        }
        const validaSenha = await bcrypt.compare(String(senha), validar.senha);
        if(!validaSenha){
            return res.status(401).json({ message: 'Senha incorreta.' });
        }else{
            const token = jwt.sign({sub:email, type:0 }, jwtSecret,
                {
                    expiresIn: '1h'
                })
                
            return res.status(200).json({   message: 'Credenciais válidas.', IdUsuario:validar.id_user,Senha:validar.senha, Tipo:validar.tipo, Status:validar.status, CreatedAt:validar.createdAt, UpdatedAt:validar.updatedAt, token });
    
        }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Erro ao verificar credenciais.' });
    }
};



export default ValidaLogin