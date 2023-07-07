import conx from './../config/db.js';
import express from 'express';
const routes = express.Router();

routes.get('/', (req,res)=>{
    conx.query(
        `SELECT B.nombre as Nombre_bodega,P.nombre as Nombre_producto, SUM(I.cantidad) as total_de_producto
        FROM productos P 
        INNER JOIN inventarios I ON P.id= I.id_producto 
        INNER JOIN bodegas B ON B.id=I.id_bodega
        GROUP BY B.nombre,P.nombre
        ORDER BY total_de_producto DESC;`,
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

/* 
{
    "nombre": "producto0",
    "descripcion": "producto0",
    "estado": 1
}
*/
routes.post('/insertar', (req,res)=>{
    let databody = req.body;
    //console.log(databody);
    let queryProductos= `INSERT INTO productos(nombre,descripcion,estado) VALUES ("${databody.nombre}","${databody.descripcion}",${databody.estado})`;
    conx.query(queryProductos,(err, data1 , fil)=>{
            if(err){
                console.log("ha ocurrido un error al insertar la data", err);
                res.send(err)
            }else{
                let id = Math.floor(Math.random() * (50 - 1 +1 )) +1;
                conx.query(/* sql */`SELECT * FROM inventarios`, (err,data2,fil)=>{
                    let ids = data2.map(obj => obj.id_bodega)
                    let dentra = true;
                    console.log(ids);
                    console.log(id);
                    while(dentra){
                        if (ids.includes(id)) {
                            conx.query(`INSERT INTO inventarios(id_bodega,id_producto,cantidad) VALUES (${id},${data1.insertId},${id})`,
                            (err, data, fil)=>{
                                if(err){
                                    console.log("error el insertar la data");
                                    res.send(err);
                                }else{
                                    res.send({
                                        "Status":200,
                                        "Message": "La data se ha insertado correctamente"
                                    });
                                    console.log(data);
                                }
                            });
                            dentra = false;
                        }else{
                            id = Math.floor(Math.random() * (50 - 1 +1 )) +1;
                            console.log(id);
                        }
                    }    
                });
            }
        }
    );
});

export default routes;