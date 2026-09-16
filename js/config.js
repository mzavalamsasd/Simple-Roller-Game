var CONFIG = {  
  
  // --- the world grid -------------------------------------------------  
  TILE: 40,           // how many pixels wide and tall one grid square is  
  ROWS: 10,           // how many rows tall every level piece is  
  PIECE_COLS: 8,      // how many columns wide every level piece is  
  
  // --- the screen -----------------------------------------------------  
  CANVAS_W: 800,  
  CANVAS_H: 400,  
  
  // --- how the player moves -------------------------------------------  
  MOVE_SPEED: 4,      // pixels per frame left and right  
  JUMP_POWER: 15,     // how hard the jump pushes UP. bigger = higher  
  GRAVITY: 0.8,       // how hard the world pulls DOWN. bigger = heavier  
  MAX_FALL: 16,       // fastest the player is allowed to fall  
  
  // --- the player's size ----------------------------------------------  
  PLAYER_SIZE: 32,    // the player collides as a 32x32 box  
  PLAYER_RADIUS: 16,  // ...but is DRAWN as a circle this big  
  
  // --- drawing --------------------------------------------------------  
  LINE_WIDTH: 3,      // thickness of every black outline  
  DOT_DISTANCE: 0.55, // how far the off-center dot sits from the middle  
  
  // --- crumble mechanic ------------------------------------------------  
  CRUMBLE_SHAKE_FRAMES: 120, // about two seconds before the platform falls  
  
  // --- rules ----------------------------------------------------------  
  START_LEVEL: 0      // which level in data/levels.json to load first  
};  
