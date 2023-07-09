para este proyecto de prueba se instalaron 
# Proyecto de nodejs
se instala con npm init -y


# nodemon
npm i -E -D nodemon

--Este se instala para la ejeccucion de node en cada cambio realizado en el archivo app.js

# Express
npm i -E express

--este se usa para el enrrutado, los endpionds de la aplicacion

// https://expressjs.com/es/4x/api.html#express

# Dotenv

npm i -E -D dotenv

--este es el que me permite manejar las variables de entorno

// https://github.com/motdotla/dotenv

# Mysql2
npm i -E -D mysql2

--este es una interfas patra interactuar con bases de datos MySQL esmucho mas rapida y efectiva.

// https://github.com/sidorares/node-mysql2

# Rutas creadas, Cuales son y que me retorna cada una.

# Rutas para la tabla bodegas 

Ruta 1 
method = GET
http://127.121.12.6:9102/bodegas

Lista las bodegas en orden alfabetico

Ruta 2
method = POST
http://127.121.12.6:9102/bodegas

Me inserta una nueba bodega 
ejemplode data a enviar
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



# Rutas para la tabla productos

Ruta 1
Esta ruta me permite pasar productos de una bodega a otra 
--ejemplo de data  a enviar
{
    "id_bodega_original":19,
    "id_bodega_destino":19,
    "id_producto":112,
    "cantidad":1
}
method : PUT
http://127.121.12.6:9102/productos/transladar

Ruta 2
method = GET
http://127.121.12.6:9102/productos

Esta ruta me listala cantidad de producto en cada bodega de forma desendiente

Ruta 3
mrthod = POST

http://127.121.12.6:9102/productos/insertar

Esta ruta me inserta un dato en productos
Ejemplo de data:
{
    "nombre": "producto0",
    "descripcion": "producto0",
    "estado": 1
}




# Rutas para la tabla inventarios 


method = POST
http://127.121.12.6:9102/inventario

--Esta ruta me permite insertar un producto a una bodega
Ejemplo de data
{
    "id_bodega":50,
    "id_producto":22,
    "cantidad":12
}


