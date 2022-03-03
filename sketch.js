var START = 1
var PLAY = 2
var END = 3
var gameState = START

var gun, gunIMG
var laser, laserIMG, lasersGroup
var bg, bgIMG
var bat, batIMG, batsGroup
var human, humanIMG, humanGroup
var zombie, zombieIMG, zombieGroup
var gameOver, gameOverIMG
var tryAgain, tryAgainIMG

var score = 0
var lifetime = 100

var LaserSound
var overSound

function preload(){
gunIMG = loadImage('./images/Gun.png')
laserIMG = loadImage('./images/laserlight.png')
bgIMG = loadImage('./images/back Ground.jpg')
batIMG = loadImage('./images/bat.png')
                                                     
zombieIMG = loadImage('./images/zombie.png')
gameOverIMG = loadImage('./images/gameover.jpg')
tryAgainIMG = loadImage('./images/tryagain.png')
LaserSound = loadSound('./sounds/laser.mp3')
overSound = loadSound('./sounds/gameover.mp3')

}






function setup() {
  createCanvas(windowWidth,windowHeight)
  
  bg = createSprite(windowWidth, windowHeight);
  bg.addImage('background', bgIMG)
  bg.scale = 1.5
  bg.velocityX = -2
  bg.x = bg.width/2

  gun = createSprite(windowWidth/7, windowHeight/4, 40,40)
  gun.addImage('sniper', gunIMG)
  gun.scale = 0.4

  tryAgain = createSprite(windowWidth/2,windowHeight/2,20,20)
  tryAgain.addImage('buttonBoi', tryAgainIMG)
  tryAgain.scale = 0.6
  tryAgain.visible = false

  gameOver = createSprite(windowWidth/2,windowHeight/4,20,20)
  gameOver.addImage('gameOverBoi', gameOverIMG)
  gameOver.scale = 0.6
  gameOver.visible = false

  humanGroup = new Group()
  zombieGroup = new Group()
  batsGroup = new Group()
  lasersGroup = new Group()

  
}

function draw() {
  background(255,255,255);  
  drawSprites();
  if(gameState === START){
  textSize(60)
  fill('black')
  textFont('Algerian')
  text('SAMPLE NAME',windoWidth/3,windowHeight/8-20)

  textSize(55)
  stroke('white')
  fill('green')
  textFont('Microsoft Himalaya')
  text('instruction:',windoWidth/5-80,windowHeight/8+30)

  textSize(38)
  fill('green')
  textFont(BOLD)
  text('1) LEFT-CLICK to shoot the zombie',windoWidth/6+70,windowHeight/8+70)

  textSize(38)
  fill('green')
  textFont(BOLD)
  text('2) DONT SHOOT humans',windoWidth/6+65,windowHeight/8+110)

  textSize(38)
  fill('green')
  textFont(BOLD)
  text('3) Press ENTER to begin your journey in the abyss',windoWidth/6+50,windowHeight/8+230)
  

  if(keyDown('ENTER')){
  gameState = PLAY
  }
}
  if(gameState === PLAY){
  gameOver.visible = false
  tryAgain.visible = false
  
  

  if(bg.x<0){
  bg.x = bg.width/2
  }
  
  gun.y = World.mouseY

  if(mouseIsPressed){
  if(mouseButton === LEFT){
  createLaser()
  LaserSound.play()
  }
  }
  if(lasersGroup.isTouching(zombieGroup)){
  score = score+50
  zombieGroup.destroyEach()
  lasersGroup.destroyEach()
  }

  if(score === 500){
  lifetime = lifetime-5
  spawnbats()
  }



  
  spawnZombies()
  }

}

function createLaser(){
laser = createSprite(windwoWidth/7+80,windowHeight/4,3,13)
laser.addImage('Blast', laserIMG)
laser.scale = 0.2
laser.velocityX = 10
laser.lifetime = 35
lasersGroup.add(laser)
laser.y = gun.y
}

function spawnZombies(){
if(frameCount%60 === 0){
zombie = createSprite(1000,random(50,400),40,40)
zombie.addImage('monster', zombieIMG)
zombie.scale = 0.3
zombie.y = Math.round(random(20,400))
zombie.lifetime = 60
zombie.velocityX = -10
zombieGroup.add(zombie)

}

}

function spawnBats(){
  if(frameCount%80 === 0){
  bat = createSprite(1000,random(200,700),40,40)
  bat.addImage('monster2', batIMG)
  bat.scale = 0.2
  bat.y = Math.round(random(50,700))
  bat.lifetime = 60
  bat.velocityX = -20
  batsGroup.add(bat)
  
  }


}