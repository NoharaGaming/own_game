class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    snowMan1 = createSprite(100,200);
    snowMan1.addImage("snowMan1",snowMan1_img);
    snowMan1.scale = 0.3
    snowMan2 = createSprite(300,200);
   snowMan2.addImage("snowMan1",snowMan1_img);
  snowMan3 = createSprite(500,200);
    // snowMan3.addImage("snowMan1",snowMan1_img);
    snowMan4 = createSprite(700,200);
    // snowMan4.addImage("snowMan1",snowMan1_img);
    snowMans = [snowMan1, snowMan2, snowMan3, snowMan4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getsnowMansAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,0,displayWidth,displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the snowMans
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the snowMans a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the snowMans in y direction
        y = displayHeight - allPlayers[plr].distance;
        snowMans[index-1].x = x;
        snowMans[index-1].y = y;

        if (index === player.index){
          fill("red");
          ellipse(x,y,60,60);
          snowMans[index - 1].shapeColor = "red";
          if(keyDown("space")){
            snowMans[index - 1].addAnimation("through", snowMan1_img_through )
          }
          // camera.position.x = displayWidth/2;
          // camera.position.y = snowMans[index-1].y;
        }
       

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.update();
      player.distanceX +=10
    }
    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1;
      player.update();
      Player.updatesnowMansAtEnd(player.rank);
    }
   
    
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    form.displayEnd();

  
}



}
