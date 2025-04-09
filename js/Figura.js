class Figura{
    constructor(nombre, ctx, x, y, color){
        this.nombre = nombre;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.seleccionada = false;
    }

    desplazarX(valor) {
        this.x = this.x + valor;
    }
    desplazarY(valor) {
        this.y = this.y + valor;
    }

    getNombre(){
        return this.nombre;
    }

    setEstilo(seleccionada) {
        this.seleccionada = seleccionada;
    } 

    contienePunto(posX, posY) {}

    dibujar(){};
}