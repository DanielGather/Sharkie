class ThrowableObject extends MovableObject {
    speedX = 20;

    offset = {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      }

    constructor(x,y){
        super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.x = this.setX(x);
        this.y = y;
        this.height = 40;
        this.width = 40;
        this.throw();
    }


    setX(x){
        if(world.character.otherDirection == true){
            this.x = x - world.character.width;
            return this.x;
        } else {
            this.x = x - world.character.offset.right;
            return this.x;
        }
    }

    throw() {
        this.speedY = 1;
        let currentX = this.x;
        const direction = world.character.otherDirection ? -1 : 1;
        setStoppableInterval(this.calculateShot.bind(this, currentX, direction), 1000 / this.hz)
    }

    calculateShot(currentX, direction){
            this.x += direction;
            let distance = this.x - currentX;
            if (distance * direction <= 500) {
                this.y += Math.sin(distance / 35) * 0.3;
            } else {
                this.y -= 1.25;
            }
    }
}

