var PLAY;
var END;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground

function preload(){
  
  //to load Images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided=("sprite_2.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,450);
  
  //to create a monkey sprite
  monkey=createSprite(80,400,50,50);
  monkey.addAnimation("m",monkey_running);
  monkey.addAnimation("c",monkey_collided);
  monkey.scale=0.1;
  
  //to create a ground
  ground=createSprite(250,430,600,5);
  ground.velocityX=-3;

  //to create new groups
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  score=0;
}


function draw() {
  background("white");
  
  text("Score:"+score,250,50);
  
  
  
  
  if(gameState===PLAY){
    var survivaltime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivaltime,50,50);
    if(keyDown("space")&& monkey.y>=100 &&   monkey.collide(ground)){
     monkey.velocityY=-23.5;
     }
  
  //colliding the monkey with the ground
  monkey.collide(ground);
    
    
    

  //making a moving ground
  if(ground.x<250){
    ground.x=ground.width/2;
     }
  
  //giving gravity to the monkey
  monkey.velocityY = monkey.velocityY+1;
  
  if(monkey.isTouching(FoodGroup)){
    banana.destroy();
    score=score+1;
  }
    
    Food();
  Obstacles();
    
    
    if(obstacleGroup.isTouching(monkey)){
      FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    monkey.velocityY=0;
      monkey.changeAnimation("c",monkey_collided);
    
  
      gameState=END;
   }
    
   
      
    
  
  } else if(gameState===END){
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    monkey.velocityY=0;
      monkey.changeAnimation("c",monkey_collided);
    

  }
  
  
   
  drawSprites();
}

function Food(){
  //creating banana sprite for the monkey
  if(frameCount%80===0){
    banana=createSprite(525,random(100,250));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=160;
    FoodGroup.add(banana);
  }
}

function Obstacles(){
  //creating obstacles for the monkey
  if(frameCount%200===0){
    obstacle=createSprite(530,410);
    obstacle.addImage(obstacleImage);
    obstacle.scale=random(0.1,0.2);
    obstacle.velocityX=-5;
    obstacle.lifetime=160;
    obstacleGroup.add(obstacle);
  }
}