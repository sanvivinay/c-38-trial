var ufo, ufo_moving, ufoCollide;
var ground, invisiGround;
var star, obstacle;
var obstacle;
var starImage,obstacleImage;
var starGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var starScore =0;
//var background;


function preload(){
 
 ufo_moving = loadAnimation("ufo.png");
  
 ufoCollide = loadAnimation("ufo.png");
  
 starImage = loadImage("stars.png");
  
obstacleImage = loadImage("obstacles.jfif");
  
 //backgroung = loadImage("bg.jpg");
  
}

function setup() {
  createCanvas(600, 400);
  
  obstacleGroup = new Group();
  starGroup =  new Group();
  
  //background = createSprite(0,0,400,400);
  //background.addImage(background);
  //background.scale = 2.5;
  
  ufo = createSprite(80,230,10,10);
  ufo.scale = 0.50;
  ufo.addAnimation("ufo", ufo_moving);
  ufo.addAnimation("collide", ufoCollide);
  
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false;
  
  ground = createSprite(300,340,600,10);
  ground.scale = 1.5;
  ground.shapeColor = "white";
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  
}

function draw() {
background("white");
  fill("black");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("STARS COLLECTED: "+starScore,300,20);
  
  if (gameState === PLAY){
    //camera.x = camera.x + (6 + 3*score/100);
   // ufo.x = camera.x - 250;

    
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
    
    if(keyDown("space")&&ufo.y >= 235) {
      ufo.velocityY = -13; 
    }
  
    ufo.velocityY = ufo.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (ufo.isTouching(starGroup)){
      starScore++;  
      starGroup.destroyEach();
    
    }
    
    if (ufo.isTouching(obstacleGroup)){
      gameState = END;
    }
    obstacles();
    stars();
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    ufo.y = 235;
    ufo.scale = 0.50;
    ufo.changeAnimation("collide", ufoCollide);
    
    obstacleGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);
    fill("red")
    stroke("red")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("red");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      starsGroup.destroyEach();
      obstacleGroup.destroyEach();
      ufo.changeAnimation("ufo", ufo_moving);
      score = 0;
      starScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  ufo.collide(invisiGround);
}

function stars(){
  if(frameCount%80 === 0){
    
    star = createSprite(620,120,50,50)
    star.addAnimation("star",starImage);
    star.scale = 0.15;
    star.velocityX=-(4+score*1.5/100);
    star.lifetime = 220;
    starGroup.add(star);
    
  }
  
  
  
  
}

function obstacles(){
  if(frameCount%200 === 0){
    obstacle = createSprite(620,253,50,50);
    console.log(obstacle)
    obstacle.addImage(obstacleImage);
  
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
  
}  



