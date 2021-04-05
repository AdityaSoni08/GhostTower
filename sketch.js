var ghost,ghostI;
var bkg,bkgI;
var door,doorI,doorG;
var balcony,balconyI,balconyG;
var invBal,invBalG;
var gameState=1;
function preload(){
ghostI=loadImage("ghost-standing.png");
bkgI=loadImage("tower.png")
doorI=loadImage("door.png")
  balconyI=loadImage("climber.png")
}

function setup (){
  createCanvas(600,600);
  bkg=createSprite(width/2,height/2,600,600)
  bkg.addImage(bkgI);
  bkg.velocityY=-2
  
  
  ghost= createSprite(500,400,20,20);
  ghost.addImage(ghostI);
  ghost.scale=0.5
  stand=createSprite(500,460,50,5);
  
  doorG=new Group()
  invBalG=new Group()
  balconyG=new Group()
  
  
  
}
  
function draw(){
  if(gameState===1){
     if (bkg.y<0){
       bkg.y=height/2

     }

  spawnDoors();
    
    
    ghost.collide(stand)
  if(keyDown("left_arrow")){
    ghost.x-=3
   
  }
    if(keyDown("right_arrow")){
    ghost.x+=3
   
  }
    if(keyDown("space")){
    ghost.velocityY=-10
  }
    ghost.velocityY+=0.5
    if(balconyG.isTouching(ghost)){
     ghost.velocityY=0
    }
    if(invBalG.isTouching(ghost)){
     gameState=0
    }
   }
  
else if(gameState===0){
textSize(30)
text("GAME OVER",300,300)
bkg.velocityY=0
doorG.setVelocityYEach(0)
balconyG.setVelocityYEach(0)
invBalG.setVelocityYEach(0)
}

  
  
  
  
  drawSprites();
  if(gameState===0){
    fill("Orange")
    textSize(50)
text("GAME OVER",200,300)
  }
}

function spawnDoors(){
if(frameCount%150===0){
door=createSprite(300,0,20,20);
door.addImage(doorI);
door.velocityY=4
door.x=Math.round(random(200,400))
            
balcony=createSprite(300,50,20,20);
balcony.addImage(balconyI);
balcony.velocityY=4;
balcony.x=door.x;
  
  
invBal=createSprite(300,60,20,5);
invBal.velocityY=4;
invBal.x=door.x;
invBal.width=balcony.width;

ghost.depth=door.depth;
ghost.depth+=1
door.lifetime=300
balcony.lifetime=300
invBal.lifetime=300
  
invBal.visible=false
   
doorG.add (door)
balconyG.add (balcony)
invBalG.add (invBal)
}
}