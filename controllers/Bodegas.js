import conx from './../config/db.js';
export default {
    datosBodega(req, res){
        // console.log(req);
        console.log(conx);
        console.log('lo de ariiba');
        res.send("fuciona claro que si carajo x");
    }
}