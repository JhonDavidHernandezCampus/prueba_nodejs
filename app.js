import dotenv from 'dotenv';
import express  from 'express';
import Routes from './routes/routes.js';
dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use(express.text());

appExpress.use('/', Routes)




let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});


/* 
appExpress.get('/',(req,res)=>{
    res.send("Restorne algo?");
});
appExpress.get('/campus',(req,res)=>{
    res.send("Restorne algo en el endpoind campus?");
}); 
*/

/* 
const server = serve.createServer((req,res)=>{
    console.log(req);

});

server.listen(5000); */
