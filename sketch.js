var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path, boy, cash, diamonds, jwellery, sword, end;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg, endImg;

var cashG, diamondsG, jwelleryG, swordGroup;

var treasureCollection = 0;

function preload() {
  //load all the images
  
  pathImg = loadImage("Road.png");
  
  boyImg = loadAnimation("runner1.png", "runner2.png");
  
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  
  endImg = loadImage("gameOver.png");
}

function setup() {

  createCanvas(400, 500);

  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;

  //creating boy running
  boy = createSprite(70, 330, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.addAnimation("gameOver", endImg);
  boy.scale = 0.08;
  boy.setCollider("circle", 0, 0, 600);

  //create the game end sprite
  end = createSprite(200, 250);
  end.addImage(endImg);
  end.scale = 0.9;

  //create groups for the sprites
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  background(0);

  //mak the boy move with the mouse
  boy.x = mouseX;

  //assign functions to the different game states
  if (gameState === PLAY) {
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    end.visible = false;
  } else if (gameState === END) {
    path.velocityY = 0;
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    end.visible = true;
    boy.destroy();
  }

  //make the boy collide with the edges
  edges = createEdgeSprites();
  boy.collide(edges);

  //code to reset the background
  if (path.y > 400) {
    path.y = height / 2;
  }

  //destroy the sprites if they touch the boy
  //and also increase score
  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    treasureCollection = treasureCollection + 50;
  } else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();
    treasureCollection = treasureCollection + 100;
  } else if (jwelleryG.isTouching(boy)) {
    jwelleryG.destroyEach();
    treasureCollection = treasureCollection + 150;
  } else if (swordGroup.isTouching(boy)) {
    swordGroup.destroyEach();
    gameState = END;
  }

  drawSprites();

  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 180;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 180;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 180;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 180;
    swordGroup.add(sword);
  }
}