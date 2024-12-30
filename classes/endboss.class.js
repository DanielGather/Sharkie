class Endboss extends MovableObject{

    width = 500;
    height = 500;
    y = 0;

    offset = {
        top: 160,
        right: 30,
        left: 30,
        bottom: 85
      }

    IMAGES_INTRODUCE = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ]

    IMAGES_SWIMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',        
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'

    ]


    constructor(){
        super().loadImage(this.IMAGES_INTRODUCE[0])
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_SWIMING);
        this.waitForEndbossVariable();
        this.animate();
        
    }

    animate(){
        let i = 0
        setInterval(()=>{
            // if(World.characterIsInRange){ 
            if(world.characterIsInRange){
                if(i<10){
                    this.playAnimation(this.IMAGES_INTRODUCE);
                    console.log("i", i);
                } else{
                    this.playAnimation(this.IMAGES_SWIMING);
                } 
                i++;
            }
        }, 150)
    }

    waitForEndbossVariable() {
        const interval = setInterval(() => {
            if (Level.level_end_x !== undefined) {
                clearInterval(interval);
                this.x = Level.level_end_x - 500
            }
        }, 100); // prüft alle 100ms
    }

}