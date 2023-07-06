import conx from './../config/db.js';
import express from 'express';
const routes = express.Router();

routes.get('/', (req,res)=>{
    console.log("por");
    res.send("export");
})


export default routes;