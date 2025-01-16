// CommonJS
var options = {
    zone: document.getElementById("zone_joystick"),
    color: "red",
    size: 100,
    threshold: 0.1, // before triggering a directional event
    fadeTime: 100, // transition time
    multitouch: false,
    maxNumberOfNipples: 1, // when multitouch, what is too many?
    dataOnly: false, // no dom element whatsoever
    position: { top: "50px", left: "50px" }, // preset position for 'static' mode
    mode: "dynamic", // 'dynamic', 'static' or 'semi'
    restJoystick: true, // Re-center joystick on rest state
    restOpacity: 0.5, // opacity when not 'dynamic' and rested
    lockX: false, // only move on the X axis
    lockY: false, // only move on the Y axis
    // catchDistance: 50, // distance to recycle previous joystick in
    // // 'semi' mode
    shape: "circle", // 'circle' or 'square'
    dynamicPage: false, // Enable if the page has dynamically visible elements
    follow: true, // Makes the joystick follow the thumbstick
  };
  var manager = nipplejs.create(options);
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

