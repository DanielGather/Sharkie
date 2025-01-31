class EndbossLifebar extends DrawableObject{

/**
 * Constructor for the character or object, initializing its properties and loading the image.
 * This constructor method sets the initial position, dimensions, and the image of the object.
 * - The `x` and `y` properties set the object's position on the canvas.
 * - The `width` and `height` properties define the object's size.
 * - The image is loaded from the specified path to be displayed on the canvas.
 * @constructor
 */
    constructor(){
        super().loadImage("img/4. Marcadores/green/100_  copia 3.webp")
        this.x = 875
        this.y = 0
        this.width = 50
        this.height = 50
        this.loadImage("img/4. Marcadores/green/100_  copia 3.webp")
    }
}