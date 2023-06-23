import { Personaje } from "./personaje.js";

export class SuperHeroe extends Personaje {
    constructor(id, nombre, fuerza, alias, editorial, arma) {
        super(id, nombre, fuerza);
        this.alias = alias;
        this.editorial = editorial;
        this.arma = arma;
    }
}
