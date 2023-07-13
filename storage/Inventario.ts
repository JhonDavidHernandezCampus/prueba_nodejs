import {Expose, Type, Transform} from 'class-transformer';


/* data a validar
{
    "id_bodega":9241,
    "id_producto":11,
    "cantidad":12
}
*/

export class Inventario{
    @Expose({name : 'id_bodega'})
    @Transform(({ value })=>{
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else throw {status: 400, message: `El dato id no cumple con los parametros requeridos`};},
        {toClassOnly: true})
    id_bodega:number;

    @Expose({name: 'id_producto'})
    @Transform(({ value })=>{
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else throw {status: 400, message: `El dato id no cumple con los parametros requeridos`};},
        {toClassOnly: true})
    id_producto:number;
    
    @Expose({name: 'cantidad'})
    @Transform(({ value })=>{
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else throw {status: 400, message: `El dato id no cumple con los parametros requeridos`};},
        {toClassOnly: true})
    cantidad:number;

    constructor(id_bodega:number, id_producto:number, cantidad: number){
        this.id_bodega = id_bodega;
        this.id_producto = id_producto;
        this.cantidad = cantidad;
    }
}