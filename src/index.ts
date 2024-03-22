import express, { Router } from "express";
import dotenv from "dotenv";

import RouterEmpresas from './routes/RotaEmpresas'
import RouterCandidatos from './routes/RotaCandidato'

dotenv.config();

const app = express();

app.use(express.json());

app.use("/empresas", RouterEmpresas)
app.use("/candidatos", RouterCandidatos)

app.listen(process.env.PORT, () => {
    console.log(`escutando na porta ${process.env.PORT}`)
});

