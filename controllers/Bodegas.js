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
            }
        }
    );
})




export default routes;