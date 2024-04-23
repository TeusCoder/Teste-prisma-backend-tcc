import express, { Router } from "express";
import dotenv from "dotenv";
import cors from 'cors';

import RouterEmpresas from './routes/RotaEmpresas'
import RouterCandidatos from './routes/RotaCandidato'
import RouterEndereco from './routes/rotaEndereco'
import RouterVaga from './routes/RotaVaga'
import RouterCurriculo from './routes/RotaCurriculo'
import RouterInscricoes from './routes/RotaInscricaoCandidatoVaga'
import RouterCriaVaga from './routes/RotaCriaVaga'
import RouterUploads from './routes/RotaUpload'
import RouterLogin from './routes/RotaLogin'
import multer from "multer";

dotenv.config();

const app = express();
app.use(cors({
    "origin": "*",
    "methods": "GET,PUT,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))
app.use(express.json());



app.use("/empresas", RouterEmpresas)
app.use("/candidatos", RouterCandidatos)
app.use("/enderecos", RouterEndereco)
app.use("/vagas", RouterVaga)
app.use("/curriculos", RouterCurriculo)
app.use("/inscricoes", RouterInscricoes)
app.use("/criarVagas", RouterCriaVaga)
app.use("/login", RouterLogin)
app.use("/uploads", express.static('uploads'), RouterUploads)

app.listen(process.env.PORT, () => {
    console.log(`escutando na porta ${process.env.PORT}`)
});

