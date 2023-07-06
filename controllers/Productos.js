import conx from './../config/db.js';
import express from 'express';
const routes = express.Router();

routes.get('/', (req,res)=>{
    conx.query(
        `SELECT B.nombre as Nombre_bodega,P.nombre as Nombre_producto, SUM(I.cantidad) as total_de_producto
        FROM productos P 
        INNER JOIN inventarios I ON P.id= I.id_producto 
        INNER JOIN bodegas B ON B.id=I.id_bodega
        GROUP BY B.nombre,P.nombre;`,
        (err,data,fil)=>{
            if(err){
                console.log("ha ocurrido un error en la consulta a la base de datos", err);
                res.send(err);
            }else{
                res.send(JSON.stringify(data))
            }
        }
    );
})


export default routes;