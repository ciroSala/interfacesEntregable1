class Figura{
    constructor(ctx, x, y, color){
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

    setEstilo(seleccionada) {
        this.seleccionada = seleccionada;
    } 

    contienePunto(posX, posY) {}

    dibujar(){};
}