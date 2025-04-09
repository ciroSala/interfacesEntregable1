document.addEventListener('DOMContentLoaded', function() { 
   /**
    * @type {HTMLCanvasElement}
   */
   const canvas = document.getElementById("canvas");
   
   /**
    * @type {CanvasRenderingContext2D}
   */
    const ctx = canvas.getContext("2d");

    const botonDibujar = document.getElementById("botonDibujar");
    const MAX_FIGURAS = 15;
    let arregloFiguras = [];
    let figuraSeleccionada = null;
    let mouseUp = false;
    let mouseDown = false;
    let figuraDblclick = null;
    let p = document.getElementById("p");

    document.addEventListener("dblclick", (e) => {
        if(figuraDblclick!=null){
            if(buscarFigura(e.offsetX, e.offsetY)){
                figuraDblclick.setEstilo(false);
                figuraDblclick = buscarFigura(e.offsetX, e.offsetY);
                figuraDblclick.setEstilo(true);
                dibujarFiguras();
                p.innerHTML = "Esta seleccionando un " + figuraDblclick.getNombre();
            }
        }else{
            figuraDblclick = buscarFigura(e.offsetX, e.offsetY);
            if(figuraDblclick){
                figuraDblclick.setEstilo(true);
                figuraDblclick.dibujar();
                p.innerHTML = "Esta seleccionando un " + figuraDblclick.getNombre();
            }
        }

    });

    // document.addEventListener("click", (e) => {
    //     figuraSeleccionada = buscarFigura(e.offsetX, e.offsetY);
        
    // })

    botonDibujar.addEventListener("click", dibujarCanvas);

    canvas.addEventListener("mousedown",  (e) => {
        figuraSeleccionada = buscarFigura(e.offsetX, e.offsetY);
        if(figuraSeleccionada){
            figuraSeleccionada.setEstilo(true);
            figuraSeleccionada.dibujar();
            p.innerHTML = "Esta seleccionando un " + figuraSeleccionada.getNombre();
        }
        mouseDown = true;
        mouseUp = false;
    });

    canvas.addEventListener('mouseup', (e) => {
        mouseUp = true; 
        mouseDown = false;
        if (figuraSeleccionada) {
            figuraSeleccionada.setEstilo(false);
            dibujarFiguras();
        }
        figuraSeleccionada = null;
        if(figuraDblclick!=null){
            p.innerHTML = "Esta seleccionando un " + figuraDblclick.getNombre();
        }else{
            p.innerHTML = " ";
        }
    }); 

    canvas.addEventListener('mousemove', (e) => {
        //si estoy moviendo el mouse en el canvas y estoy presionando
        // el mouse, entonces muevo la figura que tengo seleccionada al punto 
        //  de mousemove hasta que suelte el mouse  
        if(mouseDown){ //si estoy apretando (cuando suelto el mouse, mouseDown se pone en false)
            if (figuraSeleccionada) {
                //deberia mover la figura seleccionada lo que yo desplaze el mouse
                if(e.movementX > 0){
                    figuraSeleccionada.desplazarX(2); //muevo uno mas x
                } 
                if(e.movementX < 0){ 
                    figuraSeleccionada.desplazarX(-2) //muevo uno menos x
                } 
                if(e.movementY > 0){
                    figuraSeleccionada.desplazarY(2); //muevo uno mas y
                }
                if(e.movementY < 0){
                    figuraSeleccionada.desplazarY(-2); //muevo uno menos y
                }
                dibujarFiguras();
            }
        }
    }); 

    document.addEventListener('keydown', function(event) {
        if(figuraDblclick!=null){
            const tecla = event.key;
            switch (tecla) {
                case 'a':
                    figuraDblclick.desplazarX(-2);
                    break;
                case 'w':
                    figuraDblclick.desplazarY(-2);
                    break;
                case 'd':
                    figuraDblclick.desplazarX(2);
                    break;
                case 's':
                    figuraDblclick.desplazarY(2);
                    break;
                case 'Backspace':
                    figuraDblclick.setEstilo(false);
                    figuraDblclick = null;
                    p.innerHTML = "";
                break;
                default:
                    break;
            }
    
            dibujarFiguras();
        }
      });

    function crearFiguras(){
        //si todavia no llego a la cantidad maxima de figuras, entonces creo una nueva figura
        if(arregloFiguras.length>=MAX_FIGURAS){
            return
        }  
        //creo una figura aleatoria
        let figuraRandom = Math.floor(Math.random() * 3); //me da un numero entre 0 y 2
        let posX = Math.floor(Math.random() * canvas.width);
        let posY = Math.floor(Math.random() * canvas.height);
        let tamañoRandom = Math.floor(Math.random() * 100) + 50; //me da un numero entre 50 y 150
        let color = colorRandomRGBA();
        switch (figuraRandom) {
            case 0:
                let cuadrado = new Cuadrado(ctx, posX, posY, color, tamañoRandom);
                arregloFiguras.push(cuadrado);
                break;
            case 1:
                let circulo = new Circulo(ctx, posX, posY, color, tamañoRandom);
                arregloFiguras.push(circulo);
                break
            case 2:
                let rectangulo = new Rectangulo(ctx, posX, posY, color, tamañoRandom);
                arregloFiguras.push(rectangulo);
                break
            default:
                break;
        }
        crearFiguras();
    }

    function dibujarCanvas(){
        arregloFiguras = [];
        crearFiguras();
        dibujarFiguras();
    }

    function buscarFigura(posX, posY){
         //buscar en mis figuras si alguna esta seleccionada
         for(i = arregloFiguras.length-1; i>=0; i--){
            let figura =  arregloFiguras[i];
            if(figura.contienePunto(posX, posY)){
                return figura;
            };
        }
        return null;
    }

    function dibujarFiguras(){
        ctx.beginPath();
        ctx.fillStyle = 'rgb(211,211,211,255)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        for(i = 0; i<arregloFiguras.length; i++){
            let figura =  arregloFiguras[i];
            figura.dibujar();
        }
    }

    //funcion que me devuelve un color aleatorio en formato rgba
    function colorRandomRGBA(){
        let R = Math.floor(Math.random() * 256);
        let G = Math.floor(Math.random() * 256);
        let B = Math.floor(Math.random() * 256);
        let A = 255;
        return `rgba(${R},${G},${B},${A}`;
    }
});