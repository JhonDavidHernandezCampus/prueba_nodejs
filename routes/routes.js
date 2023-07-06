import express from 'express';
import BodegaController from './../controllers/Bodegas.js';
import ProductoController from './../controllers/Productos.js';
const Routes = express.Router();

/* Routes.get('/', (req, res)=>{
    console.log("estamos en raiz");
    res.send("perfecto yo sabia que iba a funcionar")
}) */
Routes.use('/bodegas', BodegaController);
Routes.use('/productos', ProductoController);

export default Routes;