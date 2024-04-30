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
<<<<<<< HEAD
// import RouterLogin from './routes/RotaLogin'
=======
import RouterLogin from './routes/RotaLogin'
import passport from "passport";
>>>>>>> 23f3ac75ba9e854894d82660f14b0cbff9d8ae8e
import multer from "multer";
import RouterUsers from './routes/RotaUser'


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
<<<<<<< HEAD
// app.use("/login", RouterLogin)
=======
app.use("/login", RouterLogin)
app.use('/token', passport.authenticate('jwt', { session: false }), RouterLogin);
>>>>>>> 23f3ac75ba9e854894d82660f14b0cbff9d8ae8e
app.use("/uploads", express.static('uploads'), RouterUploads)
app.use("/users", RouterUsers)


app.listen(process.env.PORT, () => {
    console.log(`escutando na porta ${process.env.PORT}`)
});

