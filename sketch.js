var balloon;
var background,hotAirBalloon;
var position, database;

function preload (){
  backgroundImg=loadImage("Hot Air Balloon-01.png");
  hotAirBalloon=loadImage("Hot Air Balloon-02.png");
}
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  balloon=createSprites(250,250,10,10)
  balloon.shapeColour("red");

 var balloonPosition=database.ref('ball/position');
 balloonPosition.on("value",readPosition,showError);
}

function draw() {
  background(backgroundImg);

  if (keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+ 10;
  }
  if (keyDown(UP_ARROW)){
    balloon.y=balloon.y-10;
  }
  if (keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x-10;
  }
  if (keyDown(LEFT_ARROW)){
    balloon.x=balloon.x+10
  }  
  drawSprites();
}
function writePosition(x,y){
  database.ref('balloon/position').set({
 'x': position.x + x,
 'y':position.y+y
  })
}

function readPosition (data){
  position= data.val();
  balloonPosition.x=position.x;
  balloonPosition.y=position.y;

}
function update(x,y){
  database.ref('balloon/height').set({
    'x':height.x + x,
    'y':height.y + y
  })

}
function readHeight(data){
  height = data.val();
  balloon.x=height.x;
  balloon.y = height.y;
}
function showError(){
  console.log("Error in writing to the database");
}







