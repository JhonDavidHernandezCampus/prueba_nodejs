import express from 'express';
import BodegaController from './../controllers/Bodegas.js';
const Routes = express.Router();

Routes.get('/', (req, res)=>{
    console.log("estamos en raiz");
    res.send("perfecto yo sabia que iba a funcionar")
})

Routes.get('/bodegas', BodegaController.datosBodega)

export default Routes;