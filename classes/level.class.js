class Level {
  static level_end_x;
  static enemyLevelArray = [];
  canvas;
  world;
  backgroundObjects;
  repeatCanvas;
  canvasStep;
  enemyPerLevel;
  dangerousEnemiesPerLevel;
  coinsArray = [];
  poisonBottleArray = [];
  characterSafeSpace = 500;
  canvasWidth = 1024;

  constructor(backgroundObjects, coinsPerLevel, repeatCanvas, canvasStep, poisonBottle, enemyPerLevel, dangerousEnemiesPerLevel,speedFromDangerousFish, speedNormalFish) {
    Level.level_end_x = repeatCanvas * canvasStep;
    this.backgroundObjects = backgroundObjects;
    this.createBackgroundObjects(repeatCanvas, canvasStep, backgroundObjects);
    this.createCoins(coinsPerLevel);
    this.createBottle(poisonBottle);
    this.createFish(repeatCanvas, enemyPerLevel, speedNormalFish );
    this.createDangerousFish(dangerousEnemiesPerLevel,speedFromDangerousFish);
  }

  createDangerousFish(dangerousEnemiesPerLevel,speedFromDangerousFish){
    let numberOfDangerousFishes = dangerousEnemiesPerLevel;
    let middleOfCanvas = this.canvasWidth / 2;
    for (let i = 0; i < numberOfDangerousFishes; i++) {
      Level.enemyLevelArray.push(new GreenSuperDangerousFish(middleOfCanvas,speedFromDangerousFish));
      middleOfCanvas = middleOfCanvas + this.canvasWidth;
    }
  }

  createFish(repeatCanvas, enemyPerLevel,speedNormalFish ) {
    let numberOfCanvas = repeatCanvas;
    let totalEnemies = enemyPerLevel;
    let enemiesPerCanvas = Math.floor(totalEnemies / numberOfCanvas);
    let remainingEnemies = totalEnemies % numberOfCanvas;
    let fishTypes = [OrangeFish, GreenFish, RedFish];
    let fishTypeCounts = this.calculateFishTypeCounts(totalEnemies, fishTypes);
    for (let i = 0; i < numberOfCanvas; i++) {
      this.createFishForCanvas.call(this, i, enemiesPerCanvas, remainingEnemies, fishTypes, fishTypeCounts, speedNormalFish);
    }
  }

  calculateFishTypeCounts(totalEnemies, fishTypes) {
    let fishTypeCounts = fishTypes.map((_, index) => Math.floor(totalEnemies / fishTypes.length) + (index < totalEnemies % fishTypes.length ? 1 : 0));
    return fishTypeCounts;
  }

  createFishForCanvas(i, enemiesPerCanvas, remainingEnemies, fishTypes, fishTypeCounts, speedNormalFish) {
    let canvasStartX = i * this.canvasWidth;
    let fishCount = enemiesPerCanvas + (i < remainingEnemies ? 1 : 0);
    let currentTypeIndex = 0;
    for (let j = 0; j < fishCount; j++) {
      let xPosition = this.getFishPosition.call(this, i, canvasStartX);
      for (let attempts = 0; attempts < fishTypes.length; attempts++) {
        if (fishTypeCounts[currentTypeIndex] > 0) {
          this.createFishOfType(fishTypes, currentTypeIndex, xPosition, speedNormalFish);
          fishTypeCounts[currentTypeIndex]--;
          currentTypeIndex = (currentTypeIndex + 1) % fishTypes.length;
          break;
        }
        currentTypeIndex = (currentTypeIndex + 1) % fishTypes.length;
      }
    }
  }

  getFishPosition(i, canvasStartX) {
    let xPosition = canvasStartX + Math.random() * this.canvasWidth;
    if (i === 0) {
      xPosition = this.characterSafeSpace + Math.random() * (this.canvasWidth - this.characterSafeSpace);
    }
    return xPosition;
  }

  createFishOfType(fishTypes, currentTypeIndex, xPosition, speedNormalFish) {
    Level.enemyLevelArray.push(new fishTypes[currentTypeIndex](xPosition, speedNormalFish));
  }

  createCoins(coins) {
    const coinsPerSegment = 5;
    const segmentWidth = this.canvasWidth;
    const radius = 75;
    const centerY = 150;
    const centerX = 600;

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
      }
      attempts++;
    }

    return null;
  }

  isOverlapping(x, y, bottleRadius) {
    return this.poisonBottleArray.some((bottle) => {
      const dx = bottle.x - x;
      const dy = bottle.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 2 * bottleRadius;
    });
  }

  createBackgroundObjects(repeatCanvas, canvasStep, backgroundObjects) {
    const backgroundLayers = ["img/3.Background/Layers/5. Water/D", "img/3.Background/Layers/1. Light/", "img/3.Background/Layers/3.Fondo 1/D", "img/3.Background/Layers/4.Fondo 2/D", "img/3.Background/Layers/2.Floor/D"];
    let variableZahl = 1;
    let count = 0;
    this.level_end_x = repeatCanvas * canvasStep;
    for (let i = 0; i < repeatCanvas; i++) {
      let x = i * canvasStep;
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
