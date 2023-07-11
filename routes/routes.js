import express from 'express';
import BodegaController from './../controllers/Bodegas.js';
import ProductoController from './../controllers/Productos.js';
import InventarioController from './../controllers/Inventarios.js';

const Routes = express.Router();

/* 
Routes.get('/', (req, res)=>{
    console.log("estamos en raiz");
    res.send("perfecto yo sabia que iba a funcionar")
}) 
*/
Routes.use('/bodegas',BodegaController);
Routes.use('/productos', ProductoController);
Routes.use('/inventarios', InventarioController);

export default Routes;