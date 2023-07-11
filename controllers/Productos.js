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

/* 
{
    "id_bodega_original":19,
    "id_bodega_destino":19,
    "id_producto":112,
    "cantidad":1
}

*/




routes.put('/transladar', async (req,res)=>{
    let databody = req.body;
    const bodegaOriginal = await new Promise((resolve, reject)=>{
        conx.query(`SELECT * FROM bodegas WHERE id = ${databody.id_bodega_original}`, (err,resbodegas,fil)=>{
            if (err || resbodegas.length === 0){
                res.send({"Message": "la bodega original no existe"});
            }else{
                resolve(resbodegas);
            }
        });
    })
    const bodegaDestino = await new Promise((resolve, reject)=>{
        conx.query(`SELECT * FROM bodegas WHERE id = ${databody.id_bodega_destino}`, (err,resdestino,fil)=>{
            if(err || resdestino.length === 0){
                res.send({"Message": "la bodega de destino no existe"});
            }else{
                resolve(resdestino);
            }
        })
    })
    const producto = await new Promise((resolve, rej)=>{
        conx.query(`SELECT * FROM productos WHERE id= ${databody.id_producto}`, (err,resproductos, fil)=>{
            if(err || resproductos.length === 0) {
                res.send({"Message": "el producto selecionado no existe"});S
            }else{
                resolve(resproductos);
            }
        })
    })

    let consultaInventario = `SELECT * FROM inventarios WHERE id_bodega = ${databody.id_bodega_original} AND id_producto = ${databody.id_producto}`;
    conx.query(consultaInventario,(err,respuestaOriginal,fil)=>{
        if(respuestaOriginal.length === 0){
            res.send(`{"Message":"La bodega con el id ${databody.id_bodega_original} no tiene de este producto" }`)
        }else if(respuestaOriginal[0].cantidad < databody.cantidad){
                res.send({"Message":"Cantidad del producto insuficientre en este bodega para hacer el tramite"})
        }else{
            console.log("dentra");

            let consultaInventariodestiono = `SELECT * FROM inventarios WHERE id_bodega = ${databody.id_bodega_destino} AND id_producto = ${databody.id_producto}`;
            conx.query(consultaInventariodestiono,(err,respuestaDestino, fil)=>{
                if(respuestaDestino.length === 0){
                    let inserInsert =`INSERT INTO inventarios(id_bodega,id_producto,cantidad) VALUES (${databody.id_bodega_destino},${databody.id_producto},${databody.cantidad})`;
                    let update = `UPDATE  inventarios SET cantidad = ${respuestaOriginal[0].cantidad - databody.cantidad} WHERE id= ${respuestaOriginal[0].id}`;
                    conx.query(inserInsert, (err,resinsertados,fil)=>{
                        if (err) {
                            res.send(err);
                        }else{
                            conx.query(update,(err,respuestaUpdate,fil)=>{
                                if (err) {
                                    res.send({"Message":"Ha ocurrido un error" , "Error":err})
                                }else{
                                    conx.query(`SELECT * FROM inventarios WHERE id_bodega = ${databody.id_bodega_destino} AND id_producto = ${databody.id_producto}`, (err, dataselect, fil)=>{
                                        if(err){
                                            res.send(err);
                                        }else{
                                            conx.query(`INSERT INTO historiales(cantidad,id_bodega_origen,id_bodega_destino,id_inventario) VALUES (${databody.cantidad},${databody.id_bodega_original},${databody.id_bodega_destino},${dataselect[0].id})`, (err,resdata,fil)=>{
                                                if(err){
                                                    res.send(err);
                                                }else{
                                                    res.send({"Message":"Tramite completado satisfactorianmente"});
                                                }
                                            });
                                        }
                                    })
                                }
                            });
                        }
                    });
                }else{
                    console.log("El destino al cual desea enviar existe entonces se actuañiza");

                    let UpdateResta = `UPDATE inventarios SET cantidad = ${respuestaOriginal[0].cantidad - databody.cantidad} WHERE id_bodega = ${databody.id_bodega_original} AND id_producto = ${databody.id_producto} `; 
                    let updateSuma = `UPDATE inventarios SET cantidad = ${respuestaDestino[0].cantidad + databody.cantidad}  WHERE id_bodega = ${databody.id_bodega_destino} AND id_producto = ${databody.id_producto} `;
                    conx.query(updateSuma,(err, resSuma, fil)=>{
                        if(err){
                            res.send(err);
                        }else{
                            conx.query(UpdateResta,(err,resResta,fil)=>{
                                if (err) {
                            console.log("error el la resta");
                                    res.send(err);
                                }else{
                                    conx.query(`SELECT * FROM inventarios WHERE id_bodega = ${databody.id_bodega_destino} AND id_producto = ${databody.id_producto}`, (err, dataselect, fil)=>{
                                        if(err){
                                            res.send(err);
                                        }else{
                                            conx.query(`INSERT INTO historiales(cantidad,id_bodega_origen,id_bodega_destino,id_inventario) VALUES (${databody.cantidad},${databody.id_bodega_original},${databody.id_bodega_destino},${dataselect[0].id})`, (err,resdata,fil)=>{
                                                if(err){
                                                    res.send(err);
                                                }else{
                                                    res.send({"Message":"Tramite completado satisfactorianmente"});
                                                }
                                            });
                                        }
                                    })
                                }
                            });
                        }
                    });
                }
            })
        }
    }) 
    /* de aqui para bajo esta la logica para hacer lo que el endponid me require */
});

export default routes;  