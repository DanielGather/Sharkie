/**
 * Configuration options for the virtual joystick.
 * Defines the behavior, appearance, and input parameters.
 * 
 * @typedef {Object} JoystickOptions
 * @property {HTMLElement} zone - The HTML element where the joystick is rendered.
 * @property {string} color - The color of the joystick.
 * @property {number} size - The size of the joystick in pixels.
 * @property {number} threshold - The threshold before triggering a directional event.
 * @property {number} fadeTime - Transition time (in ms) for fading in/out.
 * @property {boolean} multitouch - Allows multiple touches at the same time.
 * @property {number} maxNumberOfNipples - Maximum number of joysticks when multitouch is enabled.
 * @property {boolean} dataOnly - If true, no DOM element is created for the joystick.
 * @property {Object} position - Preset position for 'static' mode.
 * @property {string} mode - The joystick mode ('dynamic', 'static', or 'semi').
 * @property {boolean} restJoystick - Whether the joystick should re-center on release.
 * @property {number} restOpacity - The opacity when the joystick is at rest (not 'dynamic').
 * @property {boolean} lockX - Locks movement to the X-axis.
 * @property {boolean} lockY - Locks movement to the Y-axis.
 * @property {string} shape - The shape of the joystick ('circle' or 'square').
 * @property {boolean} dynamicPage - Enables adaptation for dynamically visible elements.
 * @property {boolean} follow - If true, the joystick follows the user's thumb.
 */

var options = {
  zone: document.getElementById("zone_joystick"),
  color: "black",
  size: 100,
  threshold: 0.1, // before triggering a directional event
  fadeTime: 250, // transition time
  multitouch: false,
  maxNumberOfNipples: 1, // when multitouch, what is too many?
  dataOnly: false, // no dom element whatsoever
  position: { bottom: "150px", left: "125px" }, // preset position for 'static' mode
  mode: "dynamic", // 'dynamic', 'static' or 'semi'
  restJoystick: true, // Re-center joystick on rest state
  restOpacity: 0.5, // opacity when not 'dynamic' and rested
  lockX: false, // only move on the X axis
  lockY: false, // only move on the Y axis
  // catchDistance: 50, // distance to recycle previous joystick in
  // // 'semi' mode
  shape: "circle", // 'circle' or 'square'
  dynamicPage: false, // Enable if the page has dynamically visible elements
  follow: false, // Makes the joystick follow the thumbstick
};

/**
 * Creates an instance of the virtual joystick with the defined options.
 * 
 * @type {nipplejs.JoystickManager}
 */

var manager = nipplejs.create(options);

/**
 * Event handlers for the virtual joystick.
 * Controls the character's movement direction based on joystick input.
 */

manager
  .on("start", function (evt, nipple) {
    nipple.on("dir:up", function (evt) {
      world.keyboard.UP = true;
      world.keyboard.DOWN = false;
    });
    nipple.on("dir:down", function (evt) {
      world.keyboard.DOWN = true;
      world.keyboard.UP = false;
    });
    nipple.on("dir:left", function (evt) {
      world.keyboard.LEFT = true;
      world.keyboard.RIGHT = false;
      world.keyboard.DOWN = false;
      world.keyboard.UP = false;
      world.character.otherDirection = true;
    });
    nipple.on("dir:right", function (evt) {
      world.keyboard.RIGHT = true;
      world.keyboard.LEFT = false;
      world.keyboard.DOWN = false;
      world.keyboard.UP = false;
    });

    /**
     * Resets all movement directions when the joystick is released.
     */

    nipple.on("end", function (evt) {
      world.keyboard.RIGHT = false;
      world.keyboard.LEFT = false;
      world.keyboard.DOWN = false;
      world.keyboard.UP = false;
    });
  })
  .on("removed", function (evt, nipple) {
    nipple.off("start move end dir plain");
  });
