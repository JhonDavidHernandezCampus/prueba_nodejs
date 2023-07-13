import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import { Inventario } from "../controllerDTO/Inventario.js";

const proxyInventario = express();
proxyInventario.use((req,res,next)=>{
    try {
        let dataVadidada = plainToClass(Inventario, req.body, {excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(dataVadidada));
        console.log("Esta en la data despues de ser validada",req.body);
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})

export default proxyInventario;
