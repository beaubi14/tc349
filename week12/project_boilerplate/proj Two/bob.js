var canvas = document.getElementById("theCanvas");
var context = canvas.getContext("2d");

var stage=document.querySelector("#stage");
var output=document.querySelector("#output");

var w =canvas.width;
var h =canvas.height;


audioBounce = new Audio();
audioBounce.src = "audio/Hello.wav";
audioBounce.load();

audioPain = new Audio();
audioPain.src = "audio/pain.mp3";
audioPain.load();

var left_key = 65;
var right_key = 68;
var up_key = 87;
var pause_key = 13;
var attack_key = 16;
var onGround = false;

var finishedGame = false;
var atbeginning = true;
var inMiddle = false;
var atEnd = false;
var time = 20;
var dayTime = true;

roomImage = new Image();
roomImage.src = "image/backgroundPartTwo.png";
doorWayImage = new Image();
doorWayImage.src = "image/doorWay.png";

tavernEBImage = new Image();
tavernEBImage.src = "image/tavern_entrance_back.png";
tavernEFImage = new Image();
tavernEFImage.src = "image/tavern_entrance_front.png";

backgroundImage = new Image();
backgroundImage.src = "image/backgroundTwo.png";

foregroundImage = new Image();
foregroundImage.src = "image/foregroundTwo.png";

//var adjustedStuff.x = background.x + stuff.x;

var background = Object();
background.x = 0;
background.dx = Math.random() * 2 -1;
background.gravity = 0.2;

var room = Object();
room.x = 2000;
room.y = 0;
room.dx = Math.random() * 2 -1;
room.gravity = 0.2;

var stuffTwo =Object();
stuffTwo.x = background.x + 1500;
stuffTwo.y = 70;
stuffTwo.dx = 0;
stuffTwo.dy = Math.random()* 2 -1;
stuffTwo.gravity = 0.2;
stuffTwo.health = 10;
stuffTwo.facingLeft = false;

stuffTwo.frameSize = 100;
stuffTwo.xpos = 0;
stuffTwo.numFrames = 2;
stuffTwo.ypos = 0;
stuffTwo.index = 0;
stuffTwo.image = new Image();
stuffTwo.image.src = "image/bulldog.png";
stuffTwo.counter = 0;


var stuff =Object();
stuff.x = background.x + 700;
stuff.y = 70;
stuff.dx = Math.random()* 2 -1;
stuff.dy = Math.random()* 2 -1;
stuff.gravity = 0.2;
stuff.health = 10;
stuff.facingLeft = false;

stuff.frameSize = 100;
stuff.xpos = 0;
stuff.numFrames = 2;
stuff.ypos = 0;
stuff.index = 0;
stuff.image = new Image();
stuff.image.src = "image/bulldog.png";
stuff.counter = 0;

var cloud =Object();
cloud.x = 0;
cloud.y = 50;
cloud.dx = Math.random() * 2;
cloud.image = new Image();
cloud.image.src = "image/cloud.png";

var cloudtwo =Object();
cloudtwo.x = 0;
cloudtwo.y = 50;
cloudtwo.dx = Math.round(Math.random() * 2);
cloudtwo.image = new Image();
cloudtwo.image.src = "image/cloud_two.png";

//player
var bee = Object();
bee.x = 500;
bee.dx = 2.5;
bee.y = Math.random() * 100;
//bee.dx = Math.random() * 2;
bee.gravity = 0.2;
bee.image = new Image();
bee.image.src = "image/bee.png";
bee.dLeft = false;

var muffin = Object();
muffin.x = 500;
muffin.dx = 2.5;
muffin.y = 100;
muffin.dx = 2;
muffin.gravity = 0.2;
muffin.image = new Image();
muffin.image.src = "image/bee.png";
//muffin.dLeft = false;

var bullet = Object();
bullet.x = 1500;
bullet.dx = 2.5;
bullet.y = 195;
//missile.dx + Math.random() * 2;
bullet.gravity = 0.2;
bullet.size = 100;
bullet.image = new Image();
bullet.image.src = "image/bullet.png";


var player = Object();
player.dy = Math.random() * 2 +1;
player.dx = 0;
player.x = 0;
player.y = 0;
player.SIZE = 100;
player.gravity = 0.5;
player.image_R = new Image();
player.image_R.src = "image/player_Right.png";
player.faceLeft = false;

player.image_L = new Image();
player.image_L.src = "image/player_Left.png";

player.image_FR = new Image();
player.image_FR.src = "image/player_fallingRight.png";
player.image_FL = new Image();
player.image_FL.src = "image/player_fallingLeft.png";
player.isFalling = false;

player.image_RR = new Image();
player.image_RR.src = "image/player_runningRight.png";
player.image_RL = new Image();
player.image_RL.src = "image/player_runningLeft.png";

player.auraImage = new Image();
player.current_image = player.image_R;
player.auraImage.src = "image/character_aura.png";
player.health = 10;

player.frameSize = 100;
player.xpos = 0;
player.numFrames = 2;
player.ypos = 0;
player.index = 0;
player.counter = 0;

var boss = Object();
               boss.x = 1500;
               boss.y = -300;
			   boss.size = 200;
			   boss.dx = Math.random() * 2 -1;
			   boss.dy = Math.random() *2 -1;
			   boss.gravity = 0.2;
			   boss.health = 10;
			   boss.image = new Image();
			   boss.image.src = "image/boss_image.png";
			   boss.fallingImage = new Image();
			   boss.fallingImage.src = "image/boss_fallingImage.png";
			   boss.image_current = boss.image;
			  
 
               boss.frameSize = 200;
			   boss.xpos = 0;
			   boss.numFrames = 2;
			   boss.ypos = 0;
			   boss.index = 0;
			   boss.counter = 0;
			   boss.attackCounter = 0;
//the ground

var theGroundARRAY = 
[
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2]
]; 

var nothing = 0;
var dirt = 1;
var grass = 2;
var THEplayer = 3;
var SIZE = 100;
var hasJumped = 0;

var ROWS = theGroundARRAY.length;
var COLUMNS = theGroundARRAY[0].length + background.x;
var atEnding = 0;
var score = 0;
var scoreTallied =false;
var gameState = 0;

var myVar=setInterval(function(){gameLoop()},20);


//var myVar=setInterval(function(){gameLoop()},20);


function gameLoop() {
window.addEventListener("keydown",handleKeyDown,false);
clearCanvas();
makeBackground();

thePlayer();
onPlatform();
//thePlayer();
stopFalling();
imageFacing();
playerBorder();
addStuff();
addStuffTwo();
dealDamage();
dealDamageTwo();
winGame();
makeEnemy();
drawBees();
makeForeground();
renderHealthBar();
renderText();
makeBoss();
makeBullet();

}
//sample starts
var enemy = Object();
               enemy.x = 1500;
               enemy.y = 270;
			   enemy.dx = -3;

               enemy.image = new Image();
               enemy.image.src = "image/enemyRun.png";

 
               enemy.frameSize = 24;
			   enemy.xpos = 0;
			   enemy.numFrames = 2;
			   enemy.ypos = 0;
			   enemy.index = 0;

			   
			   function makeEnemy() {
				  //context.clearRect(0,0,1000,1000);
				   context.drawImage(enemy.image, enemy.xpos, enemy.ypos, enemy.frameSize, enemy.frameSize, background.x + enemy.x, enemy.y, enemy.frameSize, enemy.frameSize);
				   //each time around we add the frame size to our xpos, moving along the source image
				   enemy.xpos += enemy.frameSize;
				   //increase the index so we know which frame of our animation we are currently on
				   enemy.index += 1;
 
				   //if our index is higher than our total number of frames, we're at the end and better start over
				   if (enemy.index >= enemy.numFrames) {
				   	enemy.xpos =0;
				   	enemy.ypos =0;
				   	enemy.index=0;	
				   //if we've gotten to the limit of our source image's width, we need to move down one row of frames				
				   } else if (enemy.xpos + enemy.frameSize > enemy.image.width){
				   	enemy.xpos =0;
				   	enemy.ypos += enemy.frameSize;
				   }
				   enemy.x += enemy.dx;
				   if (enemy.x > background.x +3000) {
					   enemy.dx = -1;
				   }
				   if (enemy.x < background.x + 2000) {
					   enemy.dx = 1;
				   }
				   if (player.x >= enemy.x +background.x - 12 &&  player.x <= enemy.x + background.x && player.y + 100 >= enemy.y && player.y + 50 <= enemy.y) {
					   player.health--;
					   audioPain.play();
		   			player.x -= player.dx;
		   			player.dx-= player.gravity;
				   }
			   }
			   
		   //sample ends
function renderText() {
	 context.fillStyle = "rgb(255,255,255)";
	if (stuff.health >= 1) {
			//context.fillStyle = "rgb(255,255,255)";
		context.fillText("Rect Health " + gameState, 10, 10);
	}
	//context.fillStyle(0, 0, 250, 50, "white");
	//context.fillRect(0, 0, 250, 50);
	
	context.fillText("Boss Health " + boss.health, 10, 20);
	context.fillText("Your Score " + score, 10, 30);
	//context.fillRect(10, 30, player.health, 10);
	context.fillText("Player Health" + player.health, 10, 40);
}

function renderHealthBar() {
	
context.fillStyle = "rgb(255,0,0)";	
if (boss.health > 0) {
	 context.fillRect(10, 10, boss.health * 10, 10);
}
 context.fillRect(10, 30, player.health *10, 10);
 context.fillStyle = "rgb(0,0,255)";
  context.fillRect(10, 20, 100, 10);
}

function addStuff() {
	//context.fillRect(background.x + 700, stuff.y, 10, 10)
	if (stuff.health >= 1) {
		context.drawImage(stuff.image, stuff.xpos, stuff.ypos, stuff.frameSize, stuff.frameSize, stuff.x + background.x, stuff.y, stuff.frameSize, stuff.frameSize);

	   stuff.counter++;
	   if (stuff.counter >= 20) {
		   stuff.counter = 0;
		   stuff.xpos += stuff.frameSize;
		   //increase the index so we know which frame of our animation we are currently on
		   stuff.index += 1;
	   //if our index is higher than our total number of frames, we're at the end and better start over
	   if (stuff.index >= stuff.numFrames) {
	   	stuff.xpos =0;
	   	stuff.ypos =0;
	   	stuff.index=0;	
	   //if we've gotten to the limit of our source image's width, we need to move down one row of frames				
	   } else if (stuff.xpos + stuff.frameSize > stuff.image.width){
	   	stuff.xpos =0;
	   	stuff.ypos += stuff.frameSize;
	   }

	   if (stuff.x < background.x) {
		   stuff.x = background.x + 2000;
	   }
   	}
  }

		if (stuff.y <= 300) {
			stuff.y -= stuff.dy;
			stuff.dy -= stuff.gravity;
		}
		if (stuff.y < 0) {
			stuff.y -= stuff.dy;
			stuff.dy -= 10;
		}
		if (stuff.y > 200) {
			stuff.y = 200;
			//stuff.dy += stuff.gravity;
			stuff.dy = 0;
			if (stuff.dx >= 1) {
				stuff.dx -= 1;
			}
			if (stuff.dx <= -1) {
				stuff.dx ++;
			}
		}
	}
	if (stuff.health <= 0) {
		//context.fillRect(stuff.x, stuff.y, 100, 100);
		if (stuff.y < 0) {
			stuff.y -= stuff.dy;
			stuff.dy -= 10;
			score += 10;
		}
	}

	function theBullet() {
		//context.fillStyle = "rgb(255,0,0)";	
		context.drawImage(bullet.image, bullet.x + background.x + room.x, bullet.y, bullet.size, bullet.size);
		bullet.x -= bullet.dx + 2;
		//bullet.dx += bullet.gravity;
		if (player.x >= bullet.x - 740 && player.x <= bullet.x - 710 && player.y > 190) {
			player.health--;
			//player.dy -= 3;
			player.dx -= 2;
			audioPain.play();
		}
		if (player.x >= bullet.x - 740 && player.x <= bullet.x - 710 && player.y <= 191) {
			//player.health--;
			player.y -= player.dy;
			player.dy += 10;
			score += 2;
			audioBounce.play();
		}
		if (bullet.x <= background.x + room.x + 1600) {
			boss.attackCounter = 0
			bullet.x = 2400 + background.x + room.x;
		}
	}
	function makeBullet() {
		//bullet.y = -300;
		if (boss.attackCounter >= 100){
			push(theBullet());
			//boss.image_current === boss.fallingImage;

		}
}
	function makeBoss() {
		if (boss.health >= 1) {
		context.drawImage(boss.image_current, boss.xpos, boss.ypos, boss.frameSize, boss.frameSize, boss.x + background.x + room.x, boss.y, boss.frameSize, boss.frameSize);
		
 	   boss.counter++;
 	   if (boss.counter >= 20) {
 		   boss.counter = 0;
 		   boss.xpos += boss.frameSize;
 		   //increase the index so we know which frame of our animation we are currently on
 		   boss.index += 1;
 	   //if our index is higher than our total number of frames, we're at the end and better start over
 	   if (boss.index >= boss.numFrames) {
 	   	boss.xpos =0;
 	   	boss.ypos =0;
 	   	boss.index=0;	
 	   //if we've gotten to the limit of our source image's width, we need to move down one row of frames				
 	   } else if (boss.xpos + boss.frameSize > boss.current_image.width){
 	   	boss.xpos =0;
 	   	boss.ypos += boss.frameSize;
 	   }
    	}
		if (player.x >= background.x + room.x + 1000) {
			boss.y += boss.dy;
			boss.dy += boss.gravity;
			boss.attackCounter++;
			//atEnding++;
		}
		if (boss.y >= 100) {
			boss.y = 100;
		}
		if (player.x >= boss.x + background.x + room.x && player.y >= boss.y) {
			player.dx -= 10;
			player.health--;
			audioPain.play();
		}
		if (player.x >= boss.x + background.x + room.x && player.y <= -25 && player.y >= - 100) {
			player.dy += 1;
			player.dx -= 10;
			boss.health--;
			score += 10;
			audioBounce.play();
		}
	}
	if (boss.health < 0) {
		console.log("you killed the boss...");
	}
	}

function drawBees() {
	for (i = 0; i < 3; i++) {

		context.drawImage(bee.image, i + background.x + bee.x + Math.random() * 50, Math.random() * 100 + 200, 10, 10);
		//bee.dx -= bee.gravity;
		if (bee.x + background.x >= player.x && bee.x + background.x <= player.x + 50 && 195 < player.y + 10) {
			player.health--;
			audioPain.play();
			player.x -= player.dx;
			player.dx-= player.gravity;
		}
	}
	//bee.x -= bee.dx;
	if (bee.dLeft === true) {
		bee.x -= bee.dx;
	}
	if (bee.dLeft === false) {
		bee.x += bee.dx;
	}
	if (bee.x < 0) {
		bee.dLeft === false;
		bee.dx = 3;
	}
	if (bee.x > 900) {
		bee.dLeft ===true;
		bee.dx = -3;
	}
}

function drawMuffin() {
	for (i = 0; i < 3; i++) {

		context.drawImage(bee.image, i + background.x + bee.x + Math.random() * 50, Math.random() * 100 + 200, 10, 10);
		//bee.dx -= bee.gravity;
		if (bee.x + background.x >= player.x && bee.x + background.x <= player.x + 50 && 195 < player.y + 10) {
			player.health--;
			audioPain.play();
			player.x -= player.dx;
			player.dx-= player.gravity;
		}
	}
	//bee.x -= bee.dx;
	if (bee.dLeft === true) {
		bee.x -= bee.dx;
	}
	if (bee.dLeft === false) {
		bee.x += bee.dx;
	}
	if (bee.x < 0) {
		bee.dLeft === false;
		bee.dx = 3;
	}
	if (bee.x > 900) {
		bee.dLeft ===true;
		bee.dx = -3;
	}
}


function addStuffTwo() {
	//context.fillRect(background.x + 700, stuff.y, 10, 10)
	if (stuffTwo.health >= 1) {
		context.drawImage(stuffTwo.image, stuffTwo.xpos, stuffTwo.ypos, stuffTwo.frameSize, stuffTwo.frameSize, stuffTwo.x + background.x, stuffTwo.y, stuff.frameSize, stuff.frameSize);

	   stuffTwo.counter++;
	   if (stuffTwo.counter >= 20) {
		   stuffTwo.counter = 0;
		   stuffTwo.xpos += stuffTwo.frameSize;
		   //increase the index so we know which frame of our animation we are currently on
		   stuffTwo.index += 1;
	   //if our index is higher than our total number of frames, we're at the end and better start over
	   if (stuffTwo.index >= stuffTwo.numFrames) {
	   	stuffTwo.xpos =0;
	   	stuffTwo.ypos =0;
	   	stuffTwo.index=0;	
	   //if we've gotten to the limit of our source image's width, we need to move down one row of frames				
	   } else if (stuffTwo.xpos + stuffTwo.frameSize > stuffTwo.image.width){
	   	stuffTwo.xpos =0;
	   	stuffTwo.ypos += stuffTwo.frameSize;
	   }

	   if (stuffTwo.x < background.x) {
		   stuffTwo.x = background.x + 2000;
	   }
   	}
  }

		if (stuffTwo.y <= 300) {
			stuffTwo.y -= stuffTwo.dy;
			stuffTwo.dy -= stuffTwo.gravity;
		}
		if (stuffTwo.y < 0) {
			stuffTwo.y -= stuffTwo.dy;
			stuffTwo.dy -= 10;
		}
		if (stuffTwo.y > 200) {
			stuffTwo.y = 200;
			//stuff.dy += stuff.gravity;
			stuffTwo.dy = 0;
			if (stuffTwo.dx >= 1) {
				stuffTwo.dx -= 1;
			}
			if (stuffTwo.dx <= -1) {
				stuffTwo.dx ++;
			}
		}
	}
	if (stuff.health <= 0) {
		//context.fillRect(stuff.x, stuff.y, 100, 100);
		if (stuff.y < 0) {
			stuff.y -= stuff.dy;
			stuff.dy -= 10;
		}
	}
	if (stuffTwo.health <= 0) {
		//context.fillRect(stuff.x, stuff.y, 100, 100);
		if (stuffTwo.y < 0) {
			stuffTwo.y -= stuff.dy;
			stuffTwo.dy -= 10;
		}
	}
	


function winGame() {
	if (background.x <= -3000 && boss.health <= 0) {
		finishedGame = true;
		context.fillStyle = "rgb(0,0,0)";
		context.drawImage(player.auraImage, 320, 30);
		context.fillText("You WIN!", 450, 200);
		if (scoreTallied = false) {
		score = score + player.health;
		scoreTallied === true;
	}
		if (score > 300) {
			score = "awesome";
		}
	}
}

function makeForeground() {
	if (background.x > -1200) {
	context.drawImage(foregroundImage, background.x, 0);
	context.drawImage(tavernEFImage, background.x + room.x - 210, 0);
}
	if (background.x < -1200) {
	context.drawImage(doorWayImage, background.x + room.x, 0);
}
}

function makeBackground() {
	if(background.x > -1200) {
	context.drawImage( backgroundImage, background.x, 0);
	context.drawImage(tavernEBImage, background.x + room.x - 210, 0);
	context.drawImage(cloud.image, cloud.x + background.x, cloud.y)
	cloud.x += cloud.dx +0.1;
	if (cloud.x > background.x + 3000) {
		cloud.x += background.x -3000;
	}
	
	context.drawImage(cloudtwo.image, cloudtwo.x + background.x, cloudtwo.y)
	cloudtwo.x -= cloudtwo.dx + 1;
	if (cloudtwo.x+100 < background.x - 100) {
		cloudtwo.x =background.x + 2000;
	}
}
if (background.x < -1200) {
	context.drawImage( roomImage,room.x + background.x, 0);
}
}


function makeGround() {
	if(stage.hasChildNodes()) {
		for(var i = 0; row < ROWS; row++) {
			stage.removeChild(stage.firstChild);
			cell.removeChild(cell.firstChild);
		}
	}
	for(var row = 0; row < ROWS; row++) {
		
		for(var column = 0; column < COLUMNS; column++) {
		
			var cell = document.createElement("img");
		
			cell.setAttribute("class", "cell");
			stage.appendChild(cell);
		
			switch(theGroundARRAY[row][column]) {
				case nothing:
					cell.src = "image/empty copy.png";
					//cell.fillRect(0, 0, 100, 100);
					onGround = false;
					player.isFalling = true;
					
					break;
				case dirt:
					cell.src = "image/dirt.png";
					onGround = true;
					player.isFalling = false;
					break;
				case grass:
					cell.src = "image/grass_tile.png";
					onGround = true;
					player.isFalling = false;
					break;
			}
			
			cell.style.top = row * SIZE + "px";
			cell.style.left = column * SIZE + "px";
			
			
		
		}
	}

}

function imageFacing () {
if (player.y > 195) {
	if (player.faceLeft === true) {
		player.current_image = player.image_L;
	}
	if (player.faceLeft === false) {
		player.current_image = player.image_R;
	}
}
if (player.y <= 194) {
	if (player.faceLeft === true) {
		player.current_image = player.image_FL;
	}
	if (player.faceLeft === false) {
		player.current_image = player.image_FR;
	}
}
	
}

function playerJumped() {
	if (hasJumped = 0) {
		up_key = 87;
	}
	if (hasJumped >= 1) {
		up_key = 0;
	}

}

function stopFalling() {
	
	if (player.isFalling = true) 
	{
		player.y -= player.dy;
		player.dy -= player.gravity;
		onGround = false;
		player.x += player.dx;
		//player.dx += player.gravity;
		//player.isFalling = false;
		/*if (player.faceLeft = true) {
			player.x = player.x - player.dx * 2;
			player.x -= player.dx;
		}
		if (player.faceLeft = false) {
			player.x = player.x + player.dx * 2;
			player.x += player.dx;
		}*/
	}
	if (player.y < -300) {
		player.y = -300;
	}
}

function onPlatform() {
	if (player.y >= 195){
		//onGround = true;
		player.isFalling === false;
		player.y = 195;
		player.dy = 0;
		hasJumped = 0;
		if( player.dx > 0) {
			player.dx -= 0.1;
			player.isFalling === false;
		}
		if( player.dx < 0) {
			player.dx += 0.1;
			player.isFalling === false;
		}
		else {
			Math.round(player.dx);
			player.isFalling === false;
		}
	}
}

function dealDamage() {
	if (player.x >= stuff.x + background.x && player.x <= stuff.x + background.x +100 && player.y <= stuff.y -10) {
		stuff.health --;
		if (stuff.health >= 1) {
			player.y -= player.dy +50;
			player.dy -= player.gravity - 0.5;
			audioBounce.play();
			score += 10;
		}
		if (stuff.health <= 0) {
			console.log("He De-edd...");
		}
	}
	if (player.x >= stuff.x + background.x - 15 && player.x <= stuff.x + background.x +115 && player.y >= stuff.y-20 && player.y <= stuff.y +100) {
			if (stuff.health >= 1) {
			player.health --;
			audioPain.play();
			//stuff.health++;
			player.x -= player.dx +100;
			player.dx += player.gravity;
		}
		if (stuff.health <= 0) {

	}
	}
}

function dealDamageTwo() {
	if (player.x >= stuffTwo.x + background.x && player.x <= stuffTwo.x + background.x +100 && player.y <= stuffTwo.y -10) {
		stuffTwo.health --;
		if (stuffTwo.health >= 1) {
			player.y -= player.dy +50;
			player.dy -= player.gravity - 0.5;
			audioBounce.play();
			score += 10;
		}
		if (stuffTwo.health <= 0) {
			console.log("He De-edd...");
		}
	}
	if (player.x >= stuffTwo.x + background.x - 15 && player.x <= stuffTwo.x + background.x +115 && player.y >= stuffTwo.y -20 && player.y <= stuffTwo.y +100) {
			if (stuffTwo.health >= 1) {
			player.health --;
			audioPain.play();
			//stuff.health++;
			player.x -= player.dx +100;
			player.dx += player.gravity;
		}
		if (stuffTwo.health <= 0) {

	}
	}
}

function playerBorder() {
	//atEnding ===false;
	if (atEnding <= 0) {
	if (player.x < 250){
		player.x = 250;
		//player.dx += 2;
		background.x += background.dx +10;
		//background.dx -= background.gravity;

		if (background.x >= 0) {
			background.x = 0;
		}
	}
	if (player.x >= 750) {
		//player.dx -= 10;
		//player.dx -= 2;
		player.x = 750;
		background.x -= background.dx +10;
		//background.dx += background.gravity;
		if (background.x <= -3000) {
			background.x = -3000;
		}
	}
}

if (atEnding >= 1) {
	context.fillRect(background.x + 3000, 0, 10, 400);
	background.x = 2000;
	if (player.x < 0){
		player.x = 0;
		//player.dx += 2;

	}
	if (player.x >= 900) {
		//player.dx -= 10;
		//player.dx -= 2;
		player.x = 900;

	}
	
}
}

function clearCanvas() {
	context.save();
	// Use the identity matrix while clearing the canvas
	//context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, w, h);
	context.restore();
	
}


function thePlayer() {
	//context.drawImage( player.auraImage, player.x-110, player.y-100);
		context.drawImage(player.current_image, player.xpos, player.ypos, player.frameSize, player.frameSize, player.x, player.y, player.frameSize, player.frameSize);

	   player.counter++;
	   if (player.counter >= 20) {
		   player.counter = 0;
		   player.xpos += player.frameSize;
		   //increase the index so we know which frame of our animation we are currently on
		   player.index += 1;
	   //if our index is higher than our total number of frames, we're at the end and better start over
	   if (player.index >= player.numFrames) {
	   	player.xpos =0;
	   	player.ypos =0;
	   	player.index=0;	
	   //if we've gotten to the limit of our source image's width, we need to move down one row of frames				
	   } else if (player.xpos + player.frameSize > player.current_image.width){
	   	player.xpos =0;
	   	player.ypos += player.frameSize;
	}
}
}


function handleKeyDown(event) {
	switch(event.keyCode) {
		case left_key:
				player.dx = -5;
				player.x -= player.dx +10;
				player.dx -= player.gravity;
				player.faceLeft = true;
				player.isFalling === false;
				if (player.dx >= 0) {
				player.current_image = player.image_RL;
			}
			if (player.dx < 0) {
			player.current_image = player.image_RL;
		}
		break;
		
		case right_key:
				player.dx = 5;
			player.x += player.dx +10;
			player.dx += player.gravity;
			player.faceLeft = false;
			player.isFalling === false;
			if (player.dx >= 0) {
			player.current_image = player.image_RR;
		}
		if (player.dx < 0) {
		player.current_image = player.image_R;
	}
		break;
		
		case up_key:
			if (hasJumped <= 0) {
				player.dy = 10;
				player.y-= player.dy + 10;
				//player.dy = 0;
				player.isFalling === true;
			}
			if (hasJumped >= 1) {
				console.log("you already jumped");
			}
			hasJumped++;
		break;
		
		case pause_key:
			alert("hello!");
		break;
	case attack_key:
		if (player.x >= stuff.x -100 && player.y >= stuff.y- 100) {

			if (player.x >= stuff.x){
							stuff.x += stuff.dx;
						//stuff.y += stuff.dy;
						stuff.dx += 10;
						//stuff.dy += 10;
						stuff.health --;
						player.faceLeft = false;
					}
					if (player.x <= stuff.x -50){
						stuff.x -= stuff.dx;
					//stuff.y -= stuff.dy;
					stuff.dx += 10;
					//stuff.dy += 10;
					stuff.health --;
					player.faceLeft = true;
				}
		}
	break;
		default:
	}
}

function mousedownHandler() {
	if (mouseX >= 200 && mouseX <= 300 && mouseY <= 300 && mouseY >= 200) {
		gameState = 1;
	}
}
