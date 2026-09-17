/* =====================================================================  
   main.js  --  THE STARTING LINE.  
  
   This is the smallest file in the project and it runs last. All it  
   does is: set up the screen, load the data files, build the first  
   level, and start the loop.  
  
   You will almost never need to change this file.  
   ===================================================================== */  
  
Draw.setup();  
  
if (!Draw.ctx) {  
  // the canvas is missing — nothing can work, so say so clearly.  
  document.getElementById("message").textContent =  
    "Canvas not found. Check that index.html has <canvas id=\"game\">.";  
} else {  
  Level.loadData(function () {  
    Game.startLevel(CONFIG.START_LEVEL);  
    Game.loop();  
  });  
}  
