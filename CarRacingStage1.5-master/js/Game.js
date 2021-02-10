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

    car1 = createSprite(100,200);
    car1.addImage(c1)
    car2 = createSprite(300,200);
    car2.addImage(c2)
    car3 = createSprite(500,200);
    car3.addImage(c3)
    car4 = createSprite(700,200);
    car4.addImage(c4)
    cars = [car1, car2, car3, car4];
    passsedFinish=false
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers()
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(ground)
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y ;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 250;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red")
          stroke(10)
          ellipse(x,y,60,60)
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>=4450){
      gameState=2
      Player.updateFinishedPlayers()
      player.rank=finishedPlayer
      player.update()
      passsedFinish=true
    }
    drawSprites();
  }

  end(){
    console.log("game over")
    Player.getPlayerInfo()
    textAlign(CENTER)
    textSize(50)
    for(var plr in allPlayers){
      if(allPlayers[plr].rank===1){
        text("1: "+allPlayers[plr].name,displayWidth/2,displayHeight/4)
      }
      else if (allPlayers[plr].rank===2){
       text("2: "+allPlayers[plr].name,displayWidth/2,displayHeight/4+20)
      }
      else if(allPlayers[plr].rank===3){
        text("3: "+allPlayers[plr].name,displayWidth/2,displayHeight/4+40)
      }
      else{
        textSize(30)
        text("Honorable Mention: "+allPlayers[plr].name,displayWidth/2,displayHeight/4+60)
      }
    }
  }

}
