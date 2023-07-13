import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {Bodegas} from './../controllerDTO/Bodegas.js';

const proxyBodegas = express();
proxyBodegas.use((req,res,next)=>{
    console.log("llega a proxybodegas");
    console.log(req.body);
    try{
            let data = plainToClass(Bodegas, req.body, {excludeExtraneousValues: true });
            req.body = JSON.parse(JSON.stringify(data));
            next();
            console.log(req.body);
    }catch (err){
        res.status(err.status).send(err);
    }
})

export default proxyBodegas;