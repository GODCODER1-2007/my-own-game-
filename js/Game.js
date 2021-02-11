class Game {
  constructor(){
    this.rank = createElement('h2')
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

    obstacle = createSprite(100,500)
    obstacle2 = createSprite(100,510)
    obstacle3 = createSprite(100,520)
    obstacles = [obstacle,obstacle2,obstacle3];
    capture1 = createSprite(100,200);
    capture1.addImage("capture1",capture1);
    capture2 = createSprite(300,200);
    capture2.addImage("capture2",capture2);
    capture3 = createSprite(500,200);
    capture3.addImage("capture3",capture3);
    capture4 = createSprite(700,200);
    capture4.addImage("capture4",capture4);
    runner = [capture1, capture2, capture3, capture4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getRank();
    
    if(allPlayers !== undefined){
      background(end);
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);

      var index1 = 0;
      var index = 0;
      var x = 175 ;
      var y;
      var A = random(100,800);
      var B = random(200,1000);

      for(var plr in allPlayers){
        index = index + 1 ;
        index1 = index1 + 1 ;
        x = x + 200;
        A = A + random(100,200);
        B = B + random(100,200);
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        var B = y+random(200,1000);
        obstacles[index1-1].x = A;    
        obstacles[index1-1].y = B; 

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }

      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank = player.rank+1;
      Player.updateRank(player.rank)
    }
   
    drawSprites();
  }
  end(){
    console.log("Game Ended");
    this.rank.html(player.rank)
    this.rank.position(displayWidth/2,0);
  }
}
