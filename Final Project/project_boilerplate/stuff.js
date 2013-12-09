var canvas = document.getElementById("theCanvas");
var context = canvas.getContext("2d");

var w =canvas.width;
var h =canvas.height;


var cloud = Object();
cloud.x = 0;
cloud.y = 425;
cloud.dx = 0.1;
cloud.gravity = 0.7;
cloud.image = new Image();
cloud.image.src = "img/cloud.png";

var cloudTwo = Object();
cloudTwo.x = 0;
cloudTwo.y = 425;
cloudTwo.dx = 0.1;
cloudTwo.gravity = 0.7;
cloudTwo.image = new Image();
cloudTwo.image.src = "img/cloud.png";

var player = Object();
player.dy = 0.01;
player.dx = 0;
player.x = 0;
player.y = 0;
player.Width = 1600;
player.Height = 625;
player.image = new Image();
player.image.src = "img/unbroken_banner.png";

var obstacle = Object();
obstacle.dy = Math.random();
obstacle.dx = 0.01;
obstacle.x = 0;
obstacle.y = 0;
obstacle.SIZE = 100;
obstacle.gravity = 1;

var nightSky = Object();
nightSky.image = new Image();
nightSky.image.src = "img/nightSky.png";

var BigText = Object();
BigText.image = new Image();
BigText.image.src = "img/portfolio_txt.png";

var myVar=setInterval(function(){gameLoop()},20);




function gameLoop() {
//window.addEventListener("keydown",handleKeyDown,false);
clearCanvas();
makeEmbers();
renderUnBroken();
cloudsDrift();
makeTheSky();
}
function makeTheSky() {
	context.drawImage(nightSky.image, player.x, player.y, player.Width, player.Height);
}

function makeEmbers() {
	context.drawImage(BigText.image, obstacle.x, obstacle.y, player.Width, player.Height);
obstacle.x += 1;
obstacle.dx += obstacle.gravity;
if (obstacle.x > 1600) {
	obstacle.x = -1600;
}

}

function renderUnBroken() {
	context.drawImage(nightSky.image, player.x, player.y, player.Width, player.Height);
	context.drawImage(player.image, player.x, player.y, player.Width, player.Height);
	//context.fillRect(cloud.x, cloud.y, 500, 70);
}

function cloudsDrift() {
	//context.fillStyle = "rgb(0,0,0)";
	context.drawImage(cloud.image, cloud.x, cloud.y, 1600, 300);
	cloud.x += cloud.dx;
	//cloud.dx += cloud.gravity;
	if (cloud.x > 1600) {
		cloud.x = -1000;
		//cloud.dx += 0;
	}
	//context.fillStyle = "rgb(0,0,0)";
	context.drawImage(cloudTwo.image, cloudTwo.x, cloudTwo.y, 1600, 300);
	cloudTwo.x -= cloudTwo.dx;
	//cloud.dx += cloud.gravity;
	if (cloudTwo.x < -1000) {
		cloudTwo.x = 1600;
		//cloud.dx = 0;
	}
}

function clearCanvas() {
	context.save();
	context.clearRect(0, 0, w, h);
	context.restore();
	
}

