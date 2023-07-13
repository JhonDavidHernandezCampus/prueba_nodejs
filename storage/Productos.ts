
import {Expose, Type, Transform } from 'class-transformer';
/*  Datos  validad
{
    "nombre": "producto0",
    "descripcion": "producto0",
    "estado": 1
}
 */
export class Productos{
    @Expose({name : 'nombre'})
    @Transform(({ value })=>{ if(/^[a-z A-Z]+$/.test(value)) return value; else throw {status:400, message: `El nombre no comple con los parametros acordados`};},
    {toClassOnly : true})
    nombre:string;

    @Expose({name: 'descripcion'})
    @Transform(({ value })=>{ if(/^[a-z A-Z]+$/.test(value)) return value; else throw {status:400, message: `La descripcion no cumopke con los parametros acordados`};},
    {toClassOnly : true})
    descripcion:string;
    
    @Expose({name: 'estado'})
    @Transform(({ value })=>{
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else throw {status: 400, message: `El dato de estado no cumple con los parametros requeridos`};},
        {toClassOnly: true})
    estado:number;

    constructor(nombre:string, descripcion:string, estado: number){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
    }
}
