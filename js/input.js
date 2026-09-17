/* =====================================================================  
   input.js  --  READING THE KEYBOARD.  
  
   Nothing in here decides what happens. It only records which keys are  
   being held down right now. js/player.js is what reads these values  
   and decides to move.  
  
   Supported keys:  
     LEFT:  ArrowLeft  or A       RIGHT: ArrowRight or D  
     JUMP:  ArrowUp, Space, or W  RESTART: R  
   ===================================================================== */  
  
var Input = {  
  left: false,  
  right: false,  
  jump: false,  
  restart: false  
};  
  
// Keys we stop from scrolling the page: arrows, space, WASD, and S.  
var BLOCKED_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",  
                    " ", "a", "d", "w", "s", "A", "D", "W", "S"];  
  
// Called whenever a key goes DOWN.  
window.addEventListener("keydown", function (event) {  
  setKey(event.key, true);  
  // stop these keys from scrolling the page  
  if (BLOCKED_KEYS.indexOf(event.key) >= 0) {  
    event.preventDefault();  
  }  
});  
  
// Called whenever a key comes back UP.  
window.addEventListener("keyup", function (event) {  
  setKey(event.key, false);  
});  
  
// One place that decides which key means what.  
// WANT TO ADD A KEY? Add a line here.  
function setKey(key, isDown) {  
  if (key === "ArrowLeft"  || key === "a" || key === "A") { Input.left  = isDown; }  
  if (key === "ArrowRight" || key === "d" || key === "D") { Input.right = isDown; }  
  if (key === "ArrowUp"    || key === " " || key === "w" || key === "W") { Input.jump = isDown; }  
  if (key === "r" || key === "R") { Input.restart = isDown; }  
}  
