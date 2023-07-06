import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

//parceamos las variables a un json para acceder a sus propiedades
let config = JSON.parse(process.env.MY_CONNECT);

const my_connect = {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
};

const conx = mysql.createPool(my_connect);

export default conx;
