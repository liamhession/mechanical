// mechanical extension of Raphael

// Return animation for an object that will enact the process of repeatedly updating the x, y coords based on vx, vy
var velocityAnimation = function(obj) {
    var cx = obj.attrs.cx;
    var vx = obj.velocity.vx;
    var cy = obj.attrs.cy;
    var vy = obj.velocity.vy;
    var anim = Raphael.animation({"cx": cx + vx, "cy": cy + vy}, 100, "linear", function() { this.animate(velocityAnimation(this)); });
    return anim;
};
// Ball -
//  x, y: specify the initial location of the ball's center
//  rad: the ball's radius
//  vx, vy: specify the ball's initial x and y velocities
Raphael.fn.ball = function(x, y, rad, vx, vy) {
    var ball = this.circle(x, y, rad);
    ball.velocity = {"vx": vx, "vy": vy};
    ball.animate(velocityAnimation(ball));
    return ball;
};
