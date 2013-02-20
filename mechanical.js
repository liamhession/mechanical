// mechanical extension of Raphael


// Ball -
//  x, y: specify the initial location of the ball's center
//  rad: the ball's radius
//  vx, vy: specify the ball's initial x and y velocities
Raphael.fn.ball = function(x, y, rad, vx, vy) {
    var ball = this.circle(x, y, rad);
    return ball;
};
