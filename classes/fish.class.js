class Fish extends MovableObject{

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');

        this.x = 200 + Math.random() * 500;
        this.y = this.calculateY();
    }

    calculateY(){
        let number = Math.random() * 400;
        if(number < 200){
            number = 200 + number;
            return number;
        } else if (number > 400){
            number = number - 200;
            return number;
        }
        return number;
    }
}