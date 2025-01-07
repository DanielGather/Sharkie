class Level {
  static level_end_x;
  enemies;
  canvas;
  backgroundObjects;
  repeatCount;
  step;
  levelEnemies;
  coinsArray = [];
  poisonBottleArray = [];
  enemyLevelArray = [
  ];

  constructor(backgroundObjects, coins, repeatCount, step, poisonBottle,enemyLevel) {
    Level.level_end_x = repeatCount * step;
    this.levelEnemies = enemyLevel;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.repeatCount = repeatCount;
    this.step = step;
    this.createBackgroundObjects(repeatCount, step);
    this.createCoins(coins);
    this.createBottle(poisonBottle);
    this.createFish();
  }

  // createCoins(coins) {
  //   for (let i = 0; i < coins; i++) {
  //     const angleStep = (1.25 * Math.PI) / coins; // Winkelabstand zwischen den Coins
  //     const angle = angleStep * i; // Winkel für den aktuellen Coin
  //     let x = 600 + 75 * Math.cos(-angle); // X-Koordinate
  //     let y = 150 + 75 * Math.sin(-angle);
  //     this.coinsArray.push(new Coins(x, y));
  //   }
  // }

  // createFish(){
  //   this.enemyLevelArray.push(
  //     new GreenFish(1024), 
  //     new RedFish(1024)
  //   )
  // }

  createFish() {
    let numberOfCanvas = this.repeatCount;
    console.log(this.levelEnemies);
    
    let enemiesPerCanvas = Math.floor(this.levelEnemies / numberOfCanvas);
    console.log(enemiesPerCanvas);
    
    let remainingEnemies = this.levelEnemies % numberOfCanvas;

    for (let i = 0; i < numberOfCanvas; i++) {
      let canvasStartX = i * 1024;
      let fishCount = enemiesPerCanvas + (i < remainingEnemies ? 1 : 0);
      for (let j = 0; j < fishCount; j++) {
        let xPosition;
        if (i === 0) {
          xPosition = 300 + Math.random() * (1024 - 300);
        } else {
          xPosition = canvasStartX + Math.random() * 1024;
        }
        this.enemyLevelArray.push(new GreenFish(xPosition),new PinkFish(xPosition),new RedFish(xPosition));
      }
    }
  }

  createCoins(coins) {
    const coinsPerSegment = 5; // Immer 5 Coins pro Halbkreis
    const segmentWidth = 1024; // Abstand zwischen den Segmenten
    const radius = 75; // Radius des Halbkreises
    const centerY = 150; // Y-Koordinate des Halbkreises
    const centerX = 600; // X-Koordinate des ersten Halbkreises

    for (let i = 0; i < coins; i++) {
        const segmentIndex = Math.floor(i / coinsPerSegment);
        const positionInSegment = i % coinsPerSegment;
        const offsetX = segmentIndex * segmentWidth;
        const angleStep = (1.25 * Math.PI) / coinsPerSegment;
        const angle = angleStep * positionInSegment;

        const x = centerX + offsetX + radius * Math.cos(-angle);
        const y = centerY + radius * Math.sin(-angle);
        this.coinsArray.push(new Coins(x, y));
    }
}

  createBottle(poisonBottle) {
    const minX = 100;
    const maxX = Level.level_end_x - 1124;
    const minY = 50;
    const maxY = 500;
    const bottleRadius = 40;

    for (let i = 0; i < poisonBottle; i++) {
      const position = this.getValidBottlePosition(minX, maxX, minY, maxY, bottleRadius);
      if (position) {
        const { x, y } = position;
        this.poisonBottleArray.push(new PoisonBottle(x, y));
      } else {
        console.warn("Konnte keine passende Position für eine Bottle finden.");
      }
    }
  }

  getValidBottlePosition(minX, maxX, minY, maxY, bottleRadius) {
    let attempts = 0;
    while (attempts < 100) {
      const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      if (!this.isOverlapping(x, y, bottleRadius)) {
        return { x, y }; 
        // Valide Position gefunden.
      }
      attempts++;
    }
    // Keine freie Position gefunden.
    return null; 
  }
  // Checkt ob eine Bottle an der gegebenen Position überlappt
  isOverlapping(x, y, bottleRadius) {
    return this.poisonBottleArray.some((bottle) => {
      const dx = bottle.x - x;
      const dy = bottle.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 2 * bottleRadius;
    });
  }

  createBackgroundObjects(repeatCount, step) {
    const backgroundLayers = ["img/3.Background/Layers/5. Water/D", "img/3.Background/Layers/1. Light/", "img/3.Background/Layers/3.Fondo 1/D", "img/3.Background/Layers/4.Fondo 2/D", "img/3.Background/Layers/2.Floor/D"];
    let variableZahl = 1;
    let count = 0;
    this.level_end_x = repeatCount * step;
    for (let i = 0; i < repeatCount; i++) {
      let x = i * step;
      backgroundLayers.forEach((backgroundLayerBase) => {
        this.backgroundObjects.push(new BackgroundObject(`${backgroundLayerBase}${variableZahl}.webp`, x, 0));
      });
      count++;
      if (count >= 1) {
        variableZahl = variableZahl === 1 ? 2 : 1;
        count = 0;
      }
    }
  }
}
