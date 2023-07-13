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
/* data a validar
{
    "id_bodega":9241,
    "id_producto":11,
    "cantidad":12
}
*/
export class Inventario {
    constructor(id_bodega, id_producto, cantidad) {
        this.id_bodega = id_bodega;
        this.id_producto = id_producto;
        this.cantidad = cantidad;
    }
}
__decorate([
    Expose({ name: 'id_bodega' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: `El dato id no cumple con los parametros requeridos` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Inventario.prototype, "id_bodega", void 0);
__decorate([
    Expose({ name: 'id_producto' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: `El dato id no cumple con los parametros requeridos` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Inventario.prototype, "id_producto", void 0);
__decorate([
    Expose({ name: 'cantidad' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value == 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: `El dato id no cumple con los parametros requeridos` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Inventario.prototype, "cantidad", void 0);
