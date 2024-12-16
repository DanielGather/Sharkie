class Endboss extends MovableObject{

    width = 500;
    height = 500;
    y = 0;

    IMAGES_SWIMING = [
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


    constructor(){
        super().loadImage(this.IMAGES_SWIMING[0])
        this.loadImages(this.IMAGES_SWIMING);
        this.x = 500;
        this.animate();
        console.log(this.IMAGES_SWIMING);
        console.log(this.x);
        
    }

    animate(){
        setInterval(()=>{
            this.playAnimation(this.IMAGES_SWIMING);
        }, 200)
    }

}