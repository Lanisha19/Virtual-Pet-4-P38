var dog, dogImg, happyDog;
var database;
var foodS, foodStock;
var milk;
var feedPet, addFd;
var bathing, sleeping, playing;

var foodObj;

var gameState = "hungry";
var gameStateRef;

var gardenImg, bedRoomImg, washRoomImg;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");

  gardenImg = loadImage("garden.png");
  bedRoomImg = loadImage("bedRoom.png");
  washRoomImg = loadImage("washRoom.png");
  milk = loadImage("Milk.png");
}

function setup() {
	createCanvas(800, 800);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(700, 250, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodObj = new Food();

}


function draw() { 
  background("green");

  foodObj.display();
  writeStock(foodS);

  if(foodS==0){
    dog.addImage(happyDog);
    milk.visible=false;
  }else{
    dog.addImage(dogImg);
    milk.visible=true;
  }

  gameStateRef = database.ref('gameState');
  gameStateRef.on("value", function(data){
  gameState = data.val();
  });

  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;
  };

  if(gameState===2){
    dog.addImage(washRoomImg);
    dog.scale=1;
    milk.visible=false;
  };

  bathing=createButton("I want to take Bath");
  bathing.position(400, 125);
  if(bathing.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washRoomImg);
    dog.scale=1;
    milk.visible=false;
  }

  sleeping=createButton("I am very sleepy");
  sleeping.position(610, 125);
  if(sleeping.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState})
  }));
  if(gameState===4){
    dog.addImage(bedRoomImg);
    dog.scale=1;
    milk.visible=false;
  }

  playing=createButton("Lets play !");
  playing.position(300, 160);
  if(playing.mousePressed(function(){
     gameState=5;
     database.ref('/').update({'gameState':gameState})
  }));
  if(gameState===5){
    dog.addImage(gardenImg);
    dog.scale=1;
    milk.visible=false;
  }
  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining "+foodS, 170, 440);
 
}
  

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  });
}

function update(state){
  database.ref('/').update({
    gameState : state
  })
}
