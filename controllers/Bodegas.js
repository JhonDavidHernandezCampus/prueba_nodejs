import express from 'express';
import conx from './../config/db.js';
import proxyBodegas from './../middleware/proxyBodegas.js';
const routes = express.Router();


routes.get('/',(req, res)=>{
    console.log("llegamos aqui");
    conx.query(
        /* sql */ `SELECT * FROM bodegas
                    ORDER BY bodegas.nombre`,
        (err, data,fil)=>{
            if(err){
                console.log("he ocurrido un error wn la consulta");
                res.send(err);
            }else{
                res.send(JSON.stringify(data));
            }
        }
    );
})

/* data de ejemplo para insertar o5
{
    "id": 921,
    "nombre": "A Bodega",
    "id_responsable": 11,
    "estado": 1,
    "created_by": null,
    "update_by": null,
    "deleted_at": null
    
}
*/

routes.post('/', proxyBodegas,(req,res)=>{
    let data = Object.values(req.body);
    console.log(req.body);
    console.log("si estoy donde es");
    conx.query(
        `INSERT INTO bodegas SET ?; 
        `,req.body,  //aunque paresta que no tiene sentido el mysql2 valida directamente los campos en el req.body y los arganiza en la query
        (err, data, fil)=>{
            if(err){
                console.log("Ha ocuriido un error en la consulta", err);
                res.send(err);
            }else{
                res.send({
                    "Status":200,
                    "Message": "La data se ha insertado correctamente"
                });
                console.log(data);
            }
        }
    );
})




export default routes;