class Fish extends MovableObject{
    
    width = 120;
    height = 80;

    offset = {
        top: 5,
        right: 10,
        left: 5,
        bottom: 25
      }

    IMAGES_SWIMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ]


    constructor(img){
        super().loadImage(img);
        this.loadImages(this.IMAGES_SWIMING)
        this.x = 300 + Math.random() * 500;
        this.y = this.calculateY();
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    calculateY(){
        let number = Math.random() * 400;
        if(number < 200){
            return 200 + number;
        } else if (number > 400){
            return number - 200;
        }
        return number;
    }
    
    fishSwiming(){
            this.playAnimation(this.IMAGES_SWIMING);
    }
    
    animate() {
        setStoppableInterval(this.moveLeft.bind(this), 1000 / this.hz)
        setStoppableInterval(this.fishSwiming.bind(this),200)
      }
}