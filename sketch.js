var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var formscreen;

var form, player, game;

var snowMans, snowMan1, snowMan2, snowMan3, snowMan4;

var track, snowMan1_img, snowMan2_img, snowMan3_img, snowMan4_img;

function preload(){
  track = loadImage("images/bg.jpg");
  snowMan1_img = loadImage("images/throw/49cd4a6fa69c2b8-0.png");
  snowMan1_img_through = loadAnimation("images/throw/49cd4a6fa69c2b8-1.png","images/throw/49cd4a6fa69c2b8-2.png","images/throw/49cd4a6fa69c2b8-3.png")
  snowMan2_img = loadImage("images/throw/49cd4a6fa69c2b8-0.png");
  snowMan3_img = loadImage("images/throw/49cd4a6fa69c2b8-0.png");
  snowMan4_img = loadImage("images/throw/49cd4a6fa69c2b8-0.png");
  // ground = loadImage("images/ground.png");
  formscreen = loadImage("images/maxresdefault.jpg");


}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background(formscreen);
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  if(player.rank === 4){
    form.reset.position(displayWidth/2,displayHeight/2);
   
  }
}
