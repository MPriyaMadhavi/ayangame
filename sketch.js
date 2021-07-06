var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score

var background,backgroundImg;
var boyrunner,boyrunnnerImg;
var branch,branchImg;
var gameOver,gameOverImg; 
var invisibleground

function preload(){
 backgroundImg = loadImage("bg 2.jpg");
 boyrunnerImg = loadImage("boy.png");
 branchImg = loadImage("branch1.png");
 gameOverImg = loadImage("gameOver.png");
}

function setup() {
createCanvas(windowWidth, windowHeight);
  
ground = createSprite(width/2,height/2,width,2);
ground.addImage(backgroundImg);
ground.x = width/2
ground.velocityX = -(6 + 3*score/100);
ground.scale=2.5
invisibleground=createSprite(50,height,1000,20)
gameOver = createSprite(width/2,height/2- 50);
gameOver.addImage(gameOverImg); 
branches = createSprite(width-50,100,10,10);
branches.addImage(branchImg);
branches.scale = 0.1;
    branchesgroup=createGroup()
boyrunner = createSprite(50,height,20,50);

boyrunner.addImage(boyrunnerImg);                              
boyrunner.setCollider('circle',0,0,350);
boyrunner.scale = 1;
 // boyrunner.debug=true
 
 
 gameOver.scale = 0.5;

 gameOver.visible = false;

 score = 0;
}

function draw() {
  //boyrunner.debug = true;
  background(0);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && boyrunner.y  >= height-120) {
      boyrunner.velocityY = -10;
       touches = [];
    }
    
    boyrunner.velocityY = boyrunner.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  boyrunner.collide(invisibleground)
    spawnbranches();
  
    if(branchesgroup.isTouching(boyrunner)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boyrunner.velocityY = 0;
    branchesgroup.setVelocityXEach(0);
    
    //change the boyrunner animation
    
    
    //set lifetime of the game objects so that they are never destroyed
    branches.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      touches = []
    }
  }


drawSprites();
}


// function spawnbranches() {
//   //write code here to spawn the branches
//   if (frameCount % 60 === 0) {
//     var branches = createSprite(width+20,height-300,40,10);
//     branches.y = Math.round(random(100,220));
//     branches.addImage(branchImg);
//     branches.scale = 0.5;
//     branches.velocityX = -3;
    
//      //assign lifetime to the variable
//      branches.lifetime = 300;
    
//     //adjust the depth
//     branches.depth = branches.depth;
//     boyrunner.depth = boyrunner.depth+1;
    
//     //add each branches to the group
//     branchesgroup.add(branches);
//   }
  
// }


function spawnbranches() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    branches.setCollider('circle',0,0,45)
    // branches.debug = true
    branches.addImage(branchImg);
    branches.velocityX = -(6 + 3*score/100);
    
    //generate random branches
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: branches.addImage(branchImg);
              break;
      case 2: branches.addImage(branchImg);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the branches           
    branches.scale = 0.3;
    branches.lifetime = 300;
    branches.depth = branches.depth;
    boyrunner.depth +=1;
    //add each branches 
    branchesgroup.add(branches);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  
  branches.destroyEach();
  boyrunner.addImage(boyrunnerImg);
  
  score = 0;
  
}