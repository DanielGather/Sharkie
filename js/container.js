/**
 * Displays the story container and hides the start screen.
 */
function showStory() {
    document.getElementById("storyContainer").classList.remove("d-none");
    document.getElementById("startImage").classList.add("d-none");
    document.getElementById("startScreen").classList.add("d-none");
  }
  
  /**
   * Displays the win screen by making the win container visible.
   */
  function showWinScreen() {
    document.getElementById("winContainer").classList.remove("d-none");
  }
  
  /**
   * Displays the lose screen by making the lose container visible.
   */
  function showLoseScreen() {
    document.getElementById("loseContainer").classList.remove("d-none");
  }
  
  /**
   * Displays the info screen by making the info container visible.
   */
  function showInfo() {
    document.getElementById("infoContainer").classList.remove("d-none");
    document.getElementById("startImage").classList.add("d-none");
    document.getElementById("startScreen").classList.add("d-none");
  }
  
  /**
   * Displays the data privacy screen by making the data privacy container visible.
   */
  function showDataPrivacy() {
    document.getElementById("dataPrivacyContainer").classList.remove("d-none");
    document.getElementById("startImage").classList.add("d-none");
    document.getElementById("startScreen").classList.add("d-none");
  }
  
  /**
   * Displays the imprint screen by making the imprint container visible.
   */
  function showImprint() {
    document.getElementById("imprintContainer").classList.remove("d-none");
    document.getElementById("startImage").classList.add("d-none");
    document.getElementById("startScreen").classList.add("d-none");
  }
  
  /**
   * Displays the controls screen by making the controls container visible.
   */
  function showControls() {
    document.getElementById("controlsContainer").classList.remove("d-none");
    document.getElementById("startImage").classList.add("d-none");
    document.getElementById("startScreen").classList.add("d-none");
  }
  
  /**
   * Resets the game to the home screen by hiding all other containers and displaying the start screen.
   */
  function goToHomeScreen() {
    document.getElementById("loseContainer").classList.add("d-none");
    document.getElementById("infoContainer").classList.add("d-none");
    document.getElementById("storyContainer").classList.add("d-none");
    document.getElementById("dataPrivacyContainer").classList.add("d-none");
    document.getElementById("imprintContainer").classList.add("d-none");
    document.getElementById("winContainer").classList.add("d-none");
    document.getElementById("joystick").classList.add("d-none");
    document.getElementById("controlButtonsTop").classList.add("d-none");
    document.getElementById("controlsContainer").classList.add("d-none");
    document.getElementById("startImage").classList.remove("d-none");
    document.getElementById("startScreen").classList.remove("d-none");
    document.getElementById("finSlap").style.zIndex = "-999";
    document.getElementById("shoot").style.zIndex = "-999";
    resetLevelParameter();
  }

  /**
 * Hides all non-essential containers and adjusts the layout for gameplay.
 */
function handleAllCointainers() {
    document.getElementById("startImage").classList.add("d-none");
    document.getElementById("startScreen").classList.add("d-none");
    document.getElementById("storyContainer").classList.add("d-none");
    document.getElementById("dataPrivacyContainer").classList.add("d-none");
    document.getElementById("imprintContainer").classList.add("d-none");
    document.getElementById("controlsContainer").classList.add("d-none");
    document.getElementById("winContainer").classList.add("d-none");
    document.getElementById("infoContainer").classList.add("d-none");
    document.getElementById("loseContainer").classList.add("d-none");
    document.getElementById("controlButtonsTop").classList.remove("d-none");
    document.getElementById("joystick").style.zIndex = "888";
    document.getElementById("finSlap").style.zIndex = "999";
    document.getElementById("shoot").style.zIndex = "999";
  }