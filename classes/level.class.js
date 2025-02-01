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

// Für die Mentoren: Die Berechnungen in der Klasse sind alle mit ChatGPT geschrieben.

  /**
 * Creates a new instance of the Level class, initializing background objects, coins, bottles, normal fish, 
 * and dangerous fish for the game. The level is set up with various game objects that are populated 
 * based on the given parameters such as the number of enemies, coins, and background layers.
 */
  constructor(backgroundObjects,coinsPerLevel,repeatCanvas,canvasStep,poisonBottle,enemyPerLevel,dangerousEnemiesPerLevel,speedFromDangerousFish,speedNormalFish,damage) {
    Level.level_end_x = repeatCanvas * canvasStep;
    this.backgroundObjects = backgroundObjects;
    this.createBackgroundObjects(repeatCanvas, canvasStep);
    this.createCoins(coinsPerLevel);
    this.createBottle(poisonBottle);
    this.createFish(repeatCanvas, enemyPerLevel, speedNormalFish, damage);
    this.createDangerousFish(dangerousEnemiesPerLevel, speedFromDangerousFish);
  }

  /**
   * Creates dangerous fish (specifically, GreenSuperDangerousFish) for the level based on the number of dangerous enemies to be created.
   * @param {number} dangerousEnemiesPerLevel - The total number of dangerous fish (GreenSuperDangerousFish) to be created for the level.
   * @param {number} speedFromDangerousFish - The speed at which the dangerous fish will move.
   */
  createDangerousFish(dangerousEnemiesPerLevel, speedFromDangerousFish) {
    let numberOfDangerousFishes = dangerousEnemiesPerLevel;
    let middleOfCanvas = this.canvasWidth / 2;
    for (let i = 0; i < numberOfDangerousFishes; i++) {
      Level.enemyLevelArray.push(
        new GreenSuperDangerousFish(middleOfCanvas, speedFromDangerousFish)
      );
      middleOfCanvas = middleOfCanvas + this.canvasWidth;
    }
  }

  /**
   * Creates fish (enemies) for each canvas based on the total number of enemies and the available fish types.
   * @param {number} repeatCanvas - The number of canvases in which the fish will be created.
   * @param {number} enemyPerLevel - The total number of enemies (fish) to be created for the level.
   * @param {number} speedNormalFish - The speed of the normal fish to be created.
   * @param {number} damage - The damage value for each fish.
   */
  createFish(repeatCanvas, enemyPerLevel, speedNormalFish, damage) {
    let numberOfCanvas = repeatCanvas;
    let totalEnemies = enemyPerLevel;
    let enemiesPerCanvas = Math.floor(totalEnemies / numberOfCanvas);
    let remainingEnemies = totalEnemies % numberOfCanvas;
    let fishTypes = [OrangeFish, GreenFish, RedFish];
    let fishTypeCounts = this.calculateFishTypeCounts(totalEnemies, fishTypes);
    for (let i = 0; i < numberOfCanvas; i++) {
      this.createFishForCanvas.call(this,i,enemiesPerCanvas,remainingEnemies,fishTypes,fishTypeCounts,speedNormalFish,damage);
    }
  }

  /**
   * Calculates the number of fish to spawn for each fish type, ensuring that the total number of
   * fish is distributed as evenly as possible across the available fish types.
   * @param {number} totalEnemies - The total number of enemies (fish) to create.
   * @param {Array} fishTypes - An array of fish types. The length of this array determines the number of fish types.
   * @returns {Array} An array of integers representing the number of fish to create for each fish type.
   *                  The total number of fish will be distributed as evenly as possible.
   */
  calculateFishTypeCounts(totalEnemies, fishTypes) {
    let fishTypeCounts = fishTypes.map(
      (_, index) =>
        Math.floor(totalEnemies / fishTypes.length) +
        (index < totalEnemies % fishTypes.length ? 1 : 0)
    );
    return fishTypeCounts;
  }

  /**
   * Creates a set of fish for a specific canvas segment, based on the number of enemies
   * to spawn, the fish types available, and their respective counts.
   */
  createFishForCanvas(i,enemiesPerCanvas,remainingEnemies,fishTypes,fishTypeCounts,speedNormalFish,damage) {
    let canvasStartX = i * this.canvasWidth;
    let fishCount = enemiesPerCanvas + (i < remainingEnemies ? 1 : 0);
    let currentTypeIndex = 0;
    for (let j = 0; j < fishCount; j++) {
      let xPosition = this.getFishPosition.call(this, i, canvasStartX);
      for (let attempts = 0; attempts < fishTypes.length; attempts++) {
        if (fishTypeCounts[currentTypeIndex] > 0) {
          this.createFishOfType(fishTypes, currentTypeIndex, xPosition, speedNormalFish, damage);
          fishTypeCounts[currentTypeIndex]--;
          currentTypeIndex = (currentTypeIndex + 1) % fishTypes.length;
          break;
        }
        currentTypeIndex = (currentTypeIndex + 1) % fishTypes.length;
      }
    }
  }

  /**
   * Calculates the x-position for a fish, ensuring that the first fish is placed
   * in a specific safe area, while other fish are placed randomly across the canvas.
   * @param {number} i - The index of the current fish. If `i === 0`, the fish is placed in a safe area.
   * @param {number} canvasStartX - The starting x-coordinate of the canvas (used as the base for positioning).
   * @returns {number} The x-coordinate for the fish.
   */
  getFishPosition(i, canvasStartX) {
    let xPosition = canvasStartX + Math.random() * this.canvasWidth;
    if (i === 0) {
      xPosition =
        this.characterSafeSpace + Math.random() * (this.canvasWidth - this.characterSafeSpace);
    }
    return xPosition;
  }

  /**
   * Creates and adds a new fish of a specified type to the enemy level array.
   * This function allows for the dynamic creation of fish of different types.
   */
  createFishOfType(fishTypes, currentTypeIndex, xPosition, speedNormalFish, damage) {
    Level.enemyLevelArray.push(new fishTypes[currentTypeIndex](xPosition, speedNormalFish, damage));
  }

  /**
   * Creates a specified number of coins distributed in circular patterns across multiple segments.
   * @param {number} coins - The total number of coins to create.
   */
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

  /**
   * Creates a specified number of poison bottles at random valid positions within the defined boundaries.
   * @param {number} poisonBottle - The number of poison bottles to create.
   */
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

  /**
   * Generates a random valid position for a poison bottle within the given boundaries
   * that does not overlap with existing bottles.
   * @param {number} minX - The minimum x-coordinate for the random position.
   * @param {number} maxX - The maximum x-coordinate for the random position.
   * @param {number} minY - The minimum y-coordinate for the random position.
   * @param {number} maxY - The maximum y-coordinate for the random position.
   * @param {number} bottleRadius - The radius of the poison bottle to check for overlap.
   * @returns {Object|null} Returns an object with `x` and `y` properties if a valid position is found,
   *                         or `null` if no valid position was found after 100 attempts.
   */
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

  /**
   * Checks if any poison bottle in the array overlaps with the specified position
   * based on the given coordinates and radius.
   * @param {number} x - The x-coordinate to check for overlap.
   * @param {number} y - The y-coordinate to check for overlap.
   * @param {number} bottleRadius - The radius of the poison bottles used for overlap detection.
   * @returns {boolean} Returns `true` if any bottle overlaps with the specified coordinates, `false` otherwise.
   */
  isOverlapping(x, y, bottleRadius) {
    return this.poisonBottleArray.some((bottle) => {
      const dx = bottle.x - x;
      const dy = bottle.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 2 * bottleRadius;
    });
  }

  /**
   * Creates background objects by looping through predefined background layers
   * and placing them across the canvas based on the number of times to repeat
   * the background and the width of each step.
   * @param {number} repeatCanvas - The number of times the background should repeat.
   * @param {number} canvasStep - The width of each step (i.e., the distance between each background layer).
   * @function createBackgroundObjects
   */
  createBackgroundObjects(repeatCanvas, canvasStep) {
    const backgroundLayers = ["img/3.Background/Layers/5. Water/D","img/3.Background/Layers/1. Light/","img/3.Background/Layers/3.Fondo 1/D","img/3.Background/Layers/4.Fondo 2/D","img/3.Background/Layers/2.Floor/D",];
    let variableZahl = 1;
    let count = 0;
    this.level_end_x = repeatCanvas * canvasStep;
    for (let i = 0; i < repeatCanvas; i++) {
      let x = i * canvasStep;
      backgroundLayers.forEach((backgroundLayerBase) => {
        this.backgroundObjects.push(new BackgroundObject(`${backgroundLayerBase}${variableZahl}.webp`, x, 0));
      });count++;
      if (count >= 1) {
        variableZahl = variableZahl === 1 ? 2 : 1;
        count = 0;
      }
    }
  }
}
