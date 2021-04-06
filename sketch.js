var ground;
var ghost;
var door;
var climber;
var invisible;
var gameState="PLAY";

function preload(){
  groundImage=loadImage("tower.png");
  
  ghostImage=loadAnimation("ghost-jumping.png", "ghost-standing.png");
  
  doorImage=loadImage("door.png");
  
  climberImage=loadImage("climber.png");
  
  
  
  
}
function setup(){
  createCanvas(600,600);
   ground=createSprite(280,300,600,600);
   ground.addImage("tall",groundImage);
  ground.velocityY=-3;
  
  ghost=createSprite(300,300,20,20);
  ghost.addAnimation("scary",ghostImage);
  ghost.scale=0.5;
  
  climberG=new Group();
  doorG=new Group();
  invisibleG=new Group();
   
}
function draw(){
  edges=createEdgeSprites();
  //ghost.collide();
  //ghost.collide(edges[4]);
  
  if(gameState==="PLAY"){
    if(ground.y<0){
    ground.y=ground.height/2;
  }
  if(keyDown("space")){
    ghost.velocityY=-11;
  }
    ghost.velocityY=ghost.velocityY +0.5;
  
  if(keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-2;
  }
 
  if(keyDown(RIGHT_ARROW)){
    ghost.x=ghost.x+2;
  }
  if(ghost.isTouching(climberG)){
    ghost.velocityY=0;
  }
    if(ghost.isTouching(invisibleG)||ghost.y>600){
      gameState="END";
    }
     doors();
  drawSprites();
  }
  if(gameState==="END"){
    background(0);
    textSize(30);
    text("Game Over!",300,300);
  }
  
  
  
  
  
}
function doors(){
 if(frameCount%200===0){
  door=createSprite(300,0,20,20);
  door.velocityY=2;
   door.addImage("door",doorImage);
   door.x=Math.round(random(100,500));
   doorG.add(door);
   door.lifetime=400;
   
   climber=createSprite(door.x,50);
   climber.velocityY=2;
   climber.addImage("climb",climberImage);
   climberG.add(climber);
   climber.lifetime=400;
   
   invisible=createSprite(climber.x,55,climber.width,5);
   invisible.velocityY=2;
   invisible.lifetime=400;
   invisible.visible=false;
   invisibleG.add(invisible);
   
   
   ghost.depth=door.depth;
   ghost.depth=ghost.depth+2;
   
   
 } 
}