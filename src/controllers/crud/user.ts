import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserSchema } from "../../dto/validacoes/UserValidacao";


const User = new PrismaClient()

//criação de usuario
async function createUser(req: Request, res: Response) {
    try {
        const {
            email,
            senha,
            tipo,
            status,
        } = req.body;
        //verificação pelo zod
        UserSchema.parse({email,senha,tipo,status});
        //criptografa a senha, usando a biblioteca bcrypt
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        //verifica se ja existe um User com esse email
        const UserExistente = await User.user.findUnique({ where: {email} });
        if (!UserExistente) {
            //criando o User
            const createdUser = await User.user.create({
                data: {
                    email,
                    senha: senhaCriptografada,
                    tipo,
                    status,
                }
            });
            //retorna o User criado
            res.status(201).json(createdUser);
        } else {
            res.status(400).json({message:`User com esse email: ${email} já existe!`});
        }
    } catch (error) {
        console.log(error);
    }
}

//function de atualizar em desenvolvimento

//função para retornar um json com uma lista de todos os Users
async function findAllUsers(req: Request, res: Response) {
    try {
        const Users = await User.user.findMany();
        res.status(200).json(Users);
    } catch (error) {
        console.log(error);
    }
}

async function findOneUser(req: Request, res: Response) {
    try {
        const { id_user } = req.params;
        if (!id_user) {
            return res.status(404).json({message: "Digite id valido" });
        }
        const UserExistente = await User.user.findUnique({ where: { id_user } });
        if(!UserExistente) {
        res.status(404).json({message:`User com esse id: ${id_user} não existe!`});
        } else {
            res.status(200).json(UserExistente)
        }
    } catch (error) {
        console.log(error)
    }
}
    // deletar User 
async function deleteUser(req: Request, res: Response) {

    try {
        const { id_user } = req.params;
        //verificar se esta correto o id
        if (!id_user) {
            return res.status(200).json({message: "Digite um id valido!" });
        }
        const usuarioExistente = await User.user.findUnique({ where: { id_user } });
        if (!usuarioExistente) {
            res.status(404).json({message:`Usuario com esse id: ${id_user} não existe!`});
        }
        else {
            await User.user.delete({ where: { id_user } })
            res.status(200).json({message: "usuario deletado"});
        }
    } catch (error) {
        console.log(error)
    }
}

export {createUser, findOneUser, findAllUsers, deleteUser}

