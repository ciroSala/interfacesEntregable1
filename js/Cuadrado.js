class Cuadrado extends Figura{;

    constructor(ctx, posX, posY, color, anchoAltura) {
        super(ctx, posX, posY, color);
        this.width = anchoAltura;
        this.height = anchoAltura;
    }

    dibujar(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill();
        if(this.seleccionada){
            this.ctx.stroke();
        }
    }

    contienePunto(posX, posY) {
        return ((posX >= this.x) && (posX <= this.x + this.width) && 
                (posY >= this.y) && (posY <= this.y + this.height));
    } 
}