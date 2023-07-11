para este proyecto de prueba se instalaron 
# Proyecto de nodejs
se instala con npm init -y


# Nodemon
npm i -E -D nodemon

--Este se instala para la ejeccucion de node en cada cambio realizado en el archivo app.js

# Express
npm i -E express

- Este se usa para el enrrutado, los endpionds de la aplicacion

// https://expressjs.com/es/4x/api.html#express

# Dotenv
```
npm i -E -D dotenv
```

- Este es el que me permite manejar las variables de entorno
las colco de forma local usando la funcion config()

```javascript
import dotenv from 'dotenv';
dotenv.config();
```

luego ya puedes acceder a las variables de entorno asi: 
```javascript
let config = JSON.parse(process.env.MY_CONNECT);
```

- https://github.com/motdotla/dotenv

# Mysql2
```
npm i -E -D mysql2
```

- Este es una interfas patra interactuar con bases de datos MySQL esmucho mas rapida y efectiva.

// https://github.com/sidorares/node-mysql2

# Rutas creadas

### Rutas para la tabla bodegas 

###### Ruta 1 
- Method = GET
http://127.121.12.6:9102/bodegas

- Lista las bodegas en orden alfabetico

###### Ruta 2
- Method = POST
http://127.121.12.6:9102/bodegas

- Me inserta una nueba bodega 
- Ejemplo de data a enviar
```json
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
```


### Rutas para la tabla productos

###### Ruta 1
- Esta ruta me permite pasar productos de una bodega a otra 
- Ejemplo de data  a enviar

```json
{
    "id_bodega_original":19,
    "id_bodega_destino":19,
    "id_producto":112,
    "cantidad":1
}
```
- Method: PUT
http://127.121.12.6:9102/productos/transladar

###### Ruta 2
- Method = GET
http://127.121.12.6:9102/productos

- Esta ruta me listala cantidad de producto en cada bodega de forma desendiente

###### Ruta 3
- Method = POST
http://127.121.12.6:9102/productos/insertar

- Esta ruta me inserta un dato en productos
- Ejemplo de data:
```json
{
    "nombre": "producto0",
    "descripcion": "producto0",
    "estado": 1
}
```


### Rutas para la tabla inventarios 


- Method = POST
http://127.121.12.6:9102/inventario

- Esta ruta me permite insertar un producto a una bodega
- Ejemplo de data
```json
{
    "id_bodega":50,
    "id_producto":22,
    "cantidad":12
}
```

#### Instalamos la libreria para manejar DTO y Configuramos nuestro entorno de desarrollo

``` 
npm init -y
```

<Permite convertir objetos JavaScript/TypeScript en estructuras de datos JSON y viceversa>
npm i -E -D class-transformer

<Una dependencia requerida por class-transformer. Proporciona la capacidad de utilizar metadatos de decoradores en tiempo de ejecución en TypeScript>
npm i -E -D reflect-metadata

<Es un lenguaje de programación basado en JavaScript que agrega características de tipo estático a JavaScript>
npm i -E -D typescript

<Esta libreria es para ejecutar los cambios en el servidor en tiempo real>
npm i -E -D nodemon

- Como debe estar el package.json
```json
  "scripts": {
    "dev":"nodemon ./app",
    "tsc": "tsc -w"
  },
```
- Creamos el archivo tscongig.json y colocamos lo siguiente
```json
{
    "compilerOptions": {
        "target": "es6", 
        "module": "ES6", 
        "moduleResolution": "node",
        "outDir": "./controller", 
        "esModuleInterop": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```
##### luego hacemos validos los cambios de la siguientre manera
- Agregamos esta linea en el archico package.json
    ```
    "tsc": "tsc -w"
    ```
    - Quedando el archivo asi
y despues tenemos el comando tsc __nombredelArchivo