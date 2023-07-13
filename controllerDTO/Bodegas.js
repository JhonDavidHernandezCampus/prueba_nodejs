var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
/*  Datos  validad
{
    "id": 921,
    "nombre": "A Bodega",
    "id_responsable": 11,
    "estado": 1
    
}
 */
export class Bodegas {
    constructor(id, nombre, id_responsable, estado) {
        this.id = id;
        this.nombre = nombre;
        this.id_responsable = id_responsable;
        this.estado = estado;
    }
}
__decorate([
    Expose({ name: 'id' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: `El dato id no cumple con los parametros requeridos` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Bodegas.prototype, "id", void 0);
__decorate([
    Expose({ name: 'nombre' }),
    Transform(({ value }) => { if (/^[a-z A-Z]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El nombre no comple con los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Bodegas.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'id_responsable' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: `El dato id no cumple con los parametros requeridos` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Bodegas.prototype, "id_responsable", void 0);
__decorate([
    Expose({ name: 'estado' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: `El dato id no cumple con los parametros requeridos` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Bodegas.prototype, "estado", void 0);
