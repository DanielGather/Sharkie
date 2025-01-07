class PoisonBottle extends DrawableObject {

    POISON_BOTTLE_IMAGE = "img/4. Marcadores/Posión/Dark - Left.webp"


    offset = {
        top: 30,
        right: 0,
        left: 20,
        bottom: 5
      }


    constructor(x,y){
        super().loadImage(this.POISON_BOTTLE_IMAGE);
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 75;
    }

}