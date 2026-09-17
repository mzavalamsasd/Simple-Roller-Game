/* =====================================================================  
   draw.js  --  EVERYTHING YOU CAN SEE.  
  
   Nothing in this file changes the game. It only puts pixels on screen.  
   If you want to change how the game LOOKS, this is the only file you  
   need. If you want to change how it BEHAVES, this is the wrong file.  
  
   The game now has a dark futuristic look: neon glowing player,  
   glowing magenta spikes, and a gradient background.  
   ===================================================================== */  
  
var Draw = {  
  canvas: null,  
  ctx: null,  
  cameraX: 0     // how far the view has scrolled to the right  
};  
  
Draw.setup = function () {  
  Draw.canvas = document.getElementById("game");  
  Draw.ctx = Draw.canvas.getContext("2d");  
};  
  
// Follow the player, but never scroll past the ends of the level.  
Draw.updateCamera = function () {  
  Draw.cameraX = Player.x - CONFIG.CANVAS_W / 2;  
  if (Draw.cameraX < 0) { Draw.cameraX = 0; }  
  
  var furthest = Level.pixelWidth() - CONFIG.CANVAS_W;  
  if (furthest < 0) { furthest = 0; }   // level narrower than the screen  
  if (Draw.cameraX > furthest) { Draw.cameraX = furthest; }  
};  
  
// Draw one whole frame.  
Draw.everything = function () {  
  var ctx = Draw.ctx;  
  
  // 1. wipe the screen with a dark futuristic gradient  
  var bg = ctx.createLinearGradient(0, 0, 0, CONFIG.CANVAS_H);  
  bg.addColorStop(0, "#07090f");  
  bg.addColorStop(1, "#141a2e");  
  ctx.fillStyle = bg;  
  ctx.fillRect(0, 0, CONFIG.CANVAS_W, CONFIG.CANVAS_H);  
  
  // 2. shift everything left so the camera looks like it moved right  
  ctx.save();  
  ctx.translate(-Draw.cameraX, 0);  
  
  Draw.world();  
  Crumble.draw();  
  Draw.player();  
  
  ctx.restore();  
};  
  
// Draw every grid square that is currently on screen.  
Draw.world = function () {  
  var ctx = Draw.ctx;  
  var size = CONFIG.TILE;  
  
  // only look at the columns that are actually visible. much faster.  
  var firstCol = Math.floor(Draw.cameraX / size) - 1;  
  var lastCol  = firstCol + Math.ceil(CONFIG.CANVAS_W / size) + 2;  
  
  for (var row = 0; row < CONFIG.ROWS; row++) {  
    for (var col = firstCol; col <= lastCol; col++) {  
      var here = Level.charAt(col, row);  
      var x = col * size;  
      var y = row * size;  
  
      if (here === "#") { Draw.block(x, y, size); }  
      if (here === "^") { Draw.spike(x, y, size); }  
      if (here === "F") { Draw.finish(x, y, size); }  
    }  
  }  
};  
  
// A solid block: dark platform with a glowing cyan outline.  
Draw.block = function (x, y, size) {  
  var ctx = Draw.ctx;  
  ctx.save();  
  ctx.shadowColor = "#00e4fd";  
  ctx.shadowBlur = 6;  
  ctx.fillStyle = "#1c2438";  
  ctx.fillRect(x, y, size, size);  
  ctx.strokeStyle = "#00e4fd";  
  ctx.lineWidth = CONFIG.LINE_WIDTH;  
  ctx.strokeRect(x + CONFIG.LINE_WIDTH / 2,  
                 y + CONFIG.LINE_WIDTH / 2,  
                 size - CONFIG.LINE_WIDTH,  
                 size - CONFIG.LINE_WIDTH);  
  ctx.restore();  
};  
  
// A spike: a glowing magenta triangle pointing up. Danger should glow.  
Draw.spike = function (x, y, size) {  
  var ctx = Draw.ctx;  
  ctx.save();  
  ctx.shadowColor = "#ff2fd6";  
  ctx.shadowBlur = 12;  
  ctx.fillStyle = "#ff2fd6";  
  ctx.beginPath();  
  ctx.moveTo(x, y + size);  
  ctx.lineTo(x + size / 2, y);  
  ctx.lineTo(x + size, y + size);  
  ctx.closePath();  
  ctx.fill();  
  ctx.restore();  
};  
  
// The finish: a glowing green pole with a flag on it.  
Draw.finish = function (x, y, size) {  
  var ctx = Draw.ctx;  
  ctx.save();  
  ctx.shadowColor = "#39ff14";  
  ctx.shadowBlur = 12;  
  ctx.fillStyle = "#39ff14";  
  ctx.fillRect(x + size / 2 - 2, y, 4, size);  
  ctx.beginPath();  
  ctx.moveTo(x + size / 2 + 2, y + 4);  
  ctx.lineTo(x + size - 4,     y + 12);  
  ctx.lineTo(x + size / 4 + 2, y + 20);  
  ctx.closePath();  
  ctx.fill();  
  ctx.restore();  
};  
  
// The player: a neon glowing cyan circle with one white rolling dot.  
Draw.player = function () {  
  var ctx = Draw.ctx;  
  var r = CONFIG.PLAYER_RADIUS;  
  var centerX = Player.x + CONFIG.PLAYER_SIZE / 2;  
  var centerY = Player.y + CONFIG.PLAYER_SIZE / 2;  
  
  // the neon glow. shadowBlur makes whatever we draw next shine.  
  ctx.save();  
  ctx.shadowColor = "#00e4fd";  
  ctx.shadowBlur = 20;  
  
  // the circle  
  ctx.fillStyle = "#00e4fd";  
  ctx.strokeStyle = "#b3f4ff";  
  ctx.lineWidth = CONFIG.LINE_WIDTH;  
  ctx.beginPath();  
  ctx.arc(centerX, centerY, r, 0, Math.PI * 2);  
  ctx.fill();  
  ctx.stroke();  
  
  // the off-center dot. its position depends on how far we have rolled.  
  var dotX = centerX + Math.cos(Player.angle) * r * CONFIG.DOT_DISTANCE;  
  var dotY = centerY + Math.sin(Player.angle) * r * CONFIG.DOT_DISTANCE;  
  
  ctx.fillStyle = "#ffffff";  
  ctx.beginPath();  
  ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);  
  ctx.fill();  
  
  ctx.restore();  
};  
