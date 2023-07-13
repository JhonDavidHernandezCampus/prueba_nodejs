import {Expose, Type, Transform } from 'class-transformer';
/*  Datos  validad
{
    "id": 921,
    "nombre": "A Bodega",
    "id_responsable": 11,
    "estado": 1
    
}
 */
export class Bodegas{
    @Expose({name : 'id'})
    @Transform(({ value })=>{
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else throw {status: 400, message: `El dato id no cumple con los parametros requeridos`};},
        {toClassOnly: true})
    id:number;

    @Expose({name: 'nombre'})
    @Transform(({ value })=>{ if(/^[a-z A-Z]+$/.test(value)) return value; else throw {status:400, message: `El nombre no comple con los parametros acordados`};},
    {toClassOnly : true})
    nombre:string;

    @Expose({name: 'id_responsable'})
    @Transform(({ value })=>{
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else throw {status: 400, message: `El dato id no cumple con los parametros requeridos`};},
        {toClassOnly: true})
    id_responsable:number;
    
    @Expose({name: 'estado'})
    @Transform(({ value })=>{
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else throw {status: 400, message: `El dato id no cumple con los parametros requeridos`};},
        {toClassOnly: true})
    estado:number;

    constructor(id:number, nombre:string, id_responsable:number, estado: number){
        this.id = id;
        this.nombre = nombre;
        this.id_responsable = id_responsable;
        this.estado = estado;
    }
}
