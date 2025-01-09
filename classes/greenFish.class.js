class GreenFish extends MovableObject{
    
    width = 120;
    height = 80;

    offset = {
        top: 5,
        right: 10,
        left: 5,
        bottom: 25
      }

    IMAGES_GREEN_FISH_SWIMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.webp',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.webp',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.webp',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.webp',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.webp'
    ]

    IMAGES_GREEN_FISH_TRANSITION = [
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.webp",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.webp",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.webp",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.webp",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.webp"
    ]

    IMAGES_GREEN_FISH_BUBBLE_SWIM = [
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.webp",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.webp",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.webp",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.webp",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.webp"
    ]

    constructor(level_end_x){
        super()
        this.level_end_x = level_end_x;
        this.loadImages(this.IMAGES_GREEN_FISH_SWIMING)
        this.loadImages(this.IMAGES_GREEN_FISH_TRANSITION)
        this.loadImages(this.IMAGES_GREEN_FISH_BUBBLE_SWIM)
        this.x = level_end_x
        this.y = this.calculateY();
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setStoppableInterval(this.moveLeft.bind(this), 1000 / this.hz)
        setStoppableInterval(this.fishSwiming.bind(this),200)
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

    // calculateX(){
    //     console.log("level end x", Level.level_end_x);
        
    //     let number = 300 + Math.random() * this.level_end_x
    //     console.log("calculateX",number);
        
    //     return number
    // }
    
    fishSwiming(){
            this.playAnimation(this.IMAGES_GREEN_FISH_SWIMING);
    }
    
}