var canvas = document.getElementById("theCanvas");
var context = canvas.getContext("2d");

var w =canvas.width;
var h =canvas.height;

var left_key = 65;
var right_key = 68;
var up_key = 32;
var pause_key = 13;

var backgroundThree = Object();
backgroundThree.x = 2000;
backgroundThree.dx = Math.random() * 2 -1;
backgroundThree.gravity = 0.2;

var backgroundTwo = Object();
backgroundTwo.x = 1000;
backgroundTwo.dx = Math.random() * 2 -1;
backgroundTwo.gravity = 0.2;

var background = Object();
background.x = 0;
background.dx = Math.random() * 2 -1;
background.gravity = 0.2;
background.width = 1000;


var player = Object();
player.dy = Math.random() * 2 +1;
player.dx = 0;
player.x = 0;
player.y = 0;
player.force = Math.random() * 200 + 100;
player.SIZE = 100;
player.gravity = 0.1;
player.health = 10;
player.hasJumped = 0;
player.hasJumped = 0;
player.score = 0;
player.isFalling = true;
player.lift = 12;

var obstacle = Object();
obstacle.dy = Math.random() * 2 +1;
obstacle.dx = 0;
obstacle.x = Math.random() * 1000;
obstacle.y = 300;
obstacle.SIZE = 100;
obstacle.gravity = 0.7;

var obstacleTwo = Object();
obstacleTwo.dy = Math.random() * 2 +1;
obstacleTwo.dx = 0;
obstacleTwo.x = Math.random() * 1000;
obstacleTwo.y = 300;
obstacleTwo.SIZE = 100;
obstacleTwo.gravity = 0.7;


var gameState = -1;

var myVar=setInterval(function(){whichLoop()},20);


function whichLoop() {
	if (gameState < 0) {
		menuLoop();
	}
	if (gameState >= 1) {
		gameLoop();
	}
}


function gameLoop() {
window.addEventListener("keydown",handleKeyDown,false);
clearCanvas();
makeBackground();
thePlayer();
playersGravity();
momentum();
moveDeBackground();
makeObstacles();
makeObstaclesTwo();
renderText();
obstacleCollision();
obstacleTwoCollision();
endTheRunner();
}

function menuLoop() {
clearCanvas();
renderTitleText();
window.addEventListener("keydown",handleTheKeyDown,false);
}

function renderTitleText() {
	context.fillStyle = "rgb(0,0,0)";
	context.fillText("endless Runner!", w/2, h/2);
	context.fillText("Press SPACE to start", w/2, h/2 + 20);
	context.fillText("How to Play:", w/2 + 5, h/2 + 50);
	context.fillText("SPACE = jump", w/2 + 5, h/2 + 60);
	if (player.score >= 1) {
		context.fillText("Your score was " + player.score, w/2, h/2 + 10);
	}
	
}

function endTheRunner() {
	if (player.health < 0) {
		gameState = -1;
		player.health = 10;
		background.dx = 0;
		player.dx = 0;
		player.x = 0
		//obstacle.x -= obstacle.size * 4;
	}
}

function makeBackground() {
	context.fillStyle = "rgb(250,250,0)";
	context.fillRect(background.x, 0, background.width, 400);
	context.fillStyle = "rgb(250,0,250)";
	context.fillRect(backgroundTwo.x, 0, 1000, 400);
	context.fillStyle = "rgb(0,250,250)";
	context.fillRect(backgroundThree.x, 0, 1000, 400);
}

function playersGravity() {
	if (player.y < 0) {
		player.y = 0;
		player.isFalling = true;
		player.lift = 12;
	}
	/*if (player.y < 295) {
		player.isFalling = true;
	}*/
 	if (player.y >= 296) {
		player.isFalling === false;
 		player.y = 296;
		player.dy = 0;
		player.hasJumped = 0;
 	}
	if (player.isFalling === true) {
		player.y += player.dy + 10;
		player.dy += player.gravity;
		
	}
	if (player.isFalling === false) {
		player.y -= player.dy + player.lift;
		player.dy -= player.gravity;
		player.lift -= 0.1;
	}
}

function momentum() {
	if (player.x < 400) {
	player.x += player.dx;
	player.dx += player.gravity;
}
	if (player.x >= 400) {
		player.x = 400;
		background.x -= player.dx;
		backgroundTwo.x -= player.dx;
		backgroundThree.x -= player.dx;
	}
	if (player.dx > 30) {
		player.dx = 30;
	}
}

function makeObstacles() {
	context.fillStyle = "rgb(0,0,0)";
	context.fillRect(background.x + obstacle.x, obstacle.y, obstacle.SIZE, obstacle.SIZE);
	//context.fillText(obstacle.x, obstacle.x + 40, obstacle.y - 10);
	if (background.x <= -900) {
		obstacle.x = Math.random() * 300 + 100;
	}
}

function obstacleCollision(){
	if(player.x >= obstacle.x + background.x && player.x <= obstacle.x + background.x + 50 && player.y >= 196 && background.x <= 500) {

			player.health--;
		
	}
}

function makeObstaclesTwo() {
	context.fillStyle = "rgb(0,0,0)";
	context.fillRect(backgroundTwo.x + obstacleTwo.x, obstacleTwo.y, obstacleTwo.SIZE, obstacleTwo.SIZE);
	//context.fillText(obstacleTwo.x, obstacleTwo.x + 40, obstacleTwo.y - 10);
	if (obstacleTwo.x + backgroundTwo.x < 0) {
		obstacleTwo.x = Math.random() * 300 + 400;
	}
}

function obstacleTwoCollision(){
	if(player.x >= obstacleTwo.x + backgroundTwo.x && player.x <= obstacleTwo.x + backgroundTwo.x + 50 && player.y >= 196 && backgroundTwo.x <= 500) {

			player.health--;
		
	}
}

function moveDeBackground() {
	if (background.x < -1000) {
		background.x = 2000;
		player.score += 1;
	}
	if (backgroundTwo.x < -1000) {
		backgroundTwo.x = 2000;
		player.score += 5;
	}
	if (backgroundThree.x < -1000) {
		backgroundThree.x = 2000;
		player.score += 50;
		player.dx += 1;
		player.dy += 3;
	}
}
function renderText() {
	context.fillStyle = "rgb(0,0,0)";
	context.fillText("your health " + player.health, 10, 10);
	context.fillText(player.dx, 10, 20);
	context.fillText("your score " + player.score, 10, 30);
}

function clearCanvas() {
	context.save();
	context.clearRect(0, 0, w, h);
	context.restore();
	
}


function thePlayer() {
	context.fillStyle = "rgb(255,0,0)";
	context.fillRect(player.x, player.y, player.SIZE, player.SIZE);
	console.log(player.y);
}

function handleKeyDown(event) {
	if(event.keyCode === up_key) {
		if (player.hasJumped <= 0)
		{
		//player.y -= player.dy + 400;
		//player.dy += player.gravity;
		player.isFalling = false;
		player.hasJumped ++;
		
	}
	if (player.hasJumped >= 1)
	{
		console.log("you have already jumped");
}
	}
}

function handleTheKeyDown(event) {
	gameState = 1;
	//player.score = 0;
}
