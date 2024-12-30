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
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
        this.throw();
    }

    throw() {
        this.speedY = 1;
        let currentX = this.x;
    
        setInterval(() => {
            this.x += 1; // Bewegung in x-Richtung
            let distance = this.x - currentX;
    
            // Optimierte Berechnung der y-Bewegung
            if (distance <= 500) {
                // Beispielkurve für die y-Bewegung (Sine-Funktion für Wellenbewegung)
                this.y += Math.sin(distance / 35) * 0.3;
            } else {
                // Nach 500 Einheiten eine konstante Bewegung
                this.y -= 1.25;
            }
        }, 1000 / this.hz);
    }
}

