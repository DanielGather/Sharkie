class Coins extends DrawableObject{
    COIN_IMAGE = "img/4. Marcadores/green/100_ copia 6.webp"
    offset = {
        top: 15,
        right: 15,
        left: 15,
        bottom: 15
      }


    constructor(x,y){
        super().loadImage("img/4. Marcadores/green/100_ copia 6.webp");
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 75;
    }



}