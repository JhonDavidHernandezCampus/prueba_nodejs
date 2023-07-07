import conx from './../config/db.js';
import express from 'express';
const router = express.Router();


/* 
data
{
    "id_bodega":50,
    "id_producto":22,
    "cantidad":12
}

*/
router.post('/',(req, res)=>{
    let queryselect = `SELECT * FROM inventarios`;
    let existecampo = false;
    conx.query(queryselect, (err,dataselect,fil)=>{
        if(err){
            console.log("error al insertar la data");
            res.send(err);
        }else{
            for(let obj of dataselect){
                console.log(obj.id_bodega === req.body.id_bodega && obj.id_producto === req.body.id_producto);
                if(obj.id_bodega === req.body.id_bodega && obj.id_producto === req.body.id_producto){
                    existecampo = true;
                    console.log(obj.id);
                        console.log("llega aqui");
                        conx.query(`UPDATE inventarios SET cantidad = ${obj.cantidad + req.body.cantidad} WHERE id= ${obj.id}`,(err,respuesta,fil)=>{
                            if(err){
                                console.log("Error al insertar la data");
                                res.send(respuesta);
                            }else{
                                res.send(respuesta)
                            }
                        });
                    break;
                }
            }
            
            if(!existecampo){
                console.log("dentra aqui");
                let queryIns = `INSERT INTO inventarios(id_bodega,id_producto,cantidad) VALUES (?,?,?)`;
                let datos = Object.values(req.body);
                console.log(datos);
                conx.query(queryIns, datos,(err,datainsert,fil)=>{
                    if(err){
                        if(err.errno === 1452){
                            console.log("llave no existente , la bodega no existe ");
                            res.send({"Message":"La bodega no existe intente con otro id", "SQLError":err});
                        }
                        console.log("error al insertar los datos", err);
                        res.send(err);
                    }else{
                        console.log("data insertada correctamente", datainsert);
                        res.send({
                            "Status":200,
                            "Message": "La data se ha insertado correctamente"
                        });
                    }
                });
            }
        }
    })
});

export default router;