/**
 * Event listener for the 'keydown' event, which updates the `keyboard` object
 * based on the pressed keys. The listener tracks the following keys:
 * - "D" for right movement (sets `keyboard.RIGHT` to true)
 * - "A" for left movement (sets `keyboard.LEFT` to true)
 * - "W" for up movement (sets `keyboard.UP` to true)
 * - "S" for down movement (sets `keyboard.DOWN` to true)
 * - "Space" for performing an action (sets `keyboard.SPACE` to true and prevents the default spacebar behavior)
 * - "F" for throwing (sets `keyboard.THROW` to true)
 * @listens keydown
 * @param {KeyboardEvent} event - The keyboard event triggered when a key is pressed.
 */
document.addEventListener("keydown", (event) => {
    if (event.code == "KeyD") {
      keyboard.RIGHT = true;
    }
    if (event.code == "KeyA") {
      keyboard.LEFT = true;
    }
    if (event.code == "KeyW") {
      keyboard.UP = true;
    }
    if (event.code == "KeyS") {
      keyboard.DOWN = true;
    }
    if (event.code == "Space") {
      event.preventDefault();
      keyboard.SPACE = true;
    }
    if (event.code == "KeyF") {
      keyboard.THROW = true;
    }
  });
  
  /**
   * Event listener for the 'keyup' event, which updates the `keyboard` object.
   */
  document.addEventListener("keyup", (event) => {
    if (event.code == "KeyD") {
      keyboard.RIGHT = false;
    }
    if (event.code == "KeyA") {
      keyboard.LEFT = false;
    }
    if (event.code == "KeyW") {
      keyboard.UP = false;
    }
    if (event.code == "KeyS") {
      keyboard.DOWN = false;
    }
    if (event.code == "Space") {
      event.preventDefault();
      keyboard.SPACE = false;
    }
    if (event.code == "KeyF") {
      keyboard.THROW = false;
    }
  });