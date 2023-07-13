import Express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import { Productos } from "../controllerDTO/Productos.js";

const proxyProductos = Express();

proxyProductos.use((req,res,next)=>{
    try {
        let dataVadidada = plainToClass(Productos, req.body, {excludeExtraneousValues: true});
        req.body = JSON.parse(JSON.stringify(dataVadidada));
        console.log("Esta en la data despues de ser validada",req.body);
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})

export default proxyProductos;
