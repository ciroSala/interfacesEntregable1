class Circulo extends Figura {

    constructor(ctx, posX, posY,  color, radio) {
        super("Circulo", ctx, posX, posY, color);
        this.radio = radio;
    }

    dibujar() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.fill();
        if (this.seleccionada) {
            this.ctx.stroke();
        }
    }

    contienePunto(posX, posY) {
        let xx = this.x - posX; // distancia en x del punto al origen del círculo
        let yy = this.y - posY; // distancia en y del punto al origen del círculo
        return ((Math.sqrt(xx*xx + yy*yy) <= this.radio));
    } // contienePunto()

}