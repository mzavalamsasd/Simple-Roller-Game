/* =====================================================================  
   game.js  --  THE RULES AND THE LOOP.  
  
   The game is always in exactly ONE mode: "playing", "dead", or "won".  
   Which mode it is in decides what happens each frame.  
  
   The loop runs about 60 times a second, forever. Every time it runs it  
   does the same two things: UPDATE (change the numbers) and DRAW (show  
   the numbers).  
   ===================================================================== */  
  
var Game = {  
  mode: "playing",   // "playing", "dead", or "won"  
  levelNumber: 0,  
  deaths: 0,         // how many times you have died this session  
  wasRestartDown: false  // was R already held last frame?  
};  
  
Game.startLevel = function (levelNumber) {  
  Game.levelNumber = levelNumber;  
  Level.build(levelNumber);  
  Crumble.reset();  
  Player.reset();  
  Game.mode = "playing";  
  Game.showMessage("");  
};  
  
Game.showMessage = function (text) {  
  document.getElementById("message").textContent = text;  
};  
  
// --- ONE FRAME --------------------------------------------------------  
Game.update = function () {  
  
  // R restarts, but only on the moment the key goes DOWN,  
  // not every frame it
