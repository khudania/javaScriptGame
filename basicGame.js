function initialize() {
    moveCount = 10;
    score = 0;

    //create Ball Objects
    for (var x = 0; x < 10; x++) {
        balls[x] = [];
        for (var y = 0; y < 10; y++) {
            balls[x][y] = new Ball(x, y);
        }
    }

    //Set Color
    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {
            while (true) {
                var colorNum = getRandomNum(6);
                if (checkColor(x, y, colorNum)) {
                    balls[x][y].color = colorNum;
                    break;
                }
            }
        }
    }

    //Set Mouse Events
    canvas.onmousedown = myMouseDown;
    canvas.onmouseup = myMouseUp;


    //Start Timer
    timer = setInterval(checkBallStatus, 25);

}

function checkBallStatus() {
    if (moves.length > 0) {


        //Decrement Gap Count
        for (var i = 0; i < moves.length; i++) {
            moves[i].update();
        }

        //If gapCount remains, put it back
        moves = moves.filter(
            function (ball) {
                return ball.gapCount != 0;
            }
        );

        //Moving done
        if (moves.length == 0) {
            setRemoveFlag();
            fall();
        }
    }
    paint();

    //Game Over
    if (moves.length == 0 && moveCount == 0) {
        clearInterval(timer);
        timer = null;
        setTimeout('gameOver()', 600);

    }
}


function paint() {
    //Clear Canvas
    ctx.clearRect(0, 0, 600, 580);
    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {
            //drawImage(image, x, y, width, height)
            ctx.drawImage(imageList[balls[x][y].color], x * 60, balls[x][y].getY(), 60, 60);
        }
    }

    //text
    ctx.font = 'bold 20px Open Sans';
    ctx.text = 'center';
    ctx.fillText('Moves Left : ' + moveCount, 50, 50);
    ctx.fillText('Score : ' + score, 450, 50);
}
