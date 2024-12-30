class Coins extends DrawableObject{




    COIN_IMAGE = "img/4. Marcadores/green/100_ copia 6.png"

    canvasWidth = 1024;
    canvasHeight = 600;

    offset = {
        top: 15,
        right: 15,
        left: 15,
        bottom: 15
      }


    constructor(x,y){
        super().loadImage("img/4. Marcadores/green/100_ copia 6.png");
        this.x = x;
        this.y = y;
        // // this.x = 300 + Math.random() * 500;
        // this.x = this.createCircleFormation(coins)
        // // this.y = 100;
        // this.y = this.createCircleFormationY(coins);
        this.width = 75;
        this.height = 75;
    }



}