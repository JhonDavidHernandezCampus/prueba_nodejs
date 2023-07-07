import express from 'express';
import conx from './../config/db.js';
const routes = express.Router();

routes.get('/', (req, res)=>{
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

/* data de ejemplo para insertar 
{
    "id": 921,
    "nombre": "A Bodega",
    "id_responsable": 11,
    "estado": 1,
    "created_by": null,
    "update_by": null,
    "created_at": "2023-05-25T06:02:57.000Z",
    "updated_at": "2023-05-25T06:02:57.000Z",
    "deleted_at": null
    
}
*/

routes.post('/', (req,res)=>{
    let data = Object.values(req.body);
    conx.query(
        `INSERT INTO bodegas(id,nombre,id_responsable,estado,created_by,update_by) VALUES (?,?,?,?,?,?); 
        `,data, 
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