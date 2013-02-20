// mechanical extension of Raphael

// Return animation for an object that will enact the process of repeatedly updating the x, y coords based on vx, vy
var movement = function(obj) {
    var x = obj.attrs.cx;
    var vx = obj.velocity.vx;

    // The y-coordinates of position and velocity are a bit more complicated, as they are
    //    relative to the base surface in the picture and inverted from how paper thinks
    var bottomOfCanvas = $('#mechanical-canvas').height();  // TODO: make relative to a frame
    var y = obj.attrs.cy;
    var vy = -obj.velocity.vy;

    // Update x and y based on the current attributes cx, cy
    obj.position.x = x;
    obj.position.y = bottomOfCanvas - y;

    // Update vx and vy based on any acceleration due to forces
    var m = obj.mass;
    var forces = obj.forces;
    for (forceName in forces) {
        obj.velocity.vx += forces[forceName].x / m;
        obj.velocity.vy += forces[forceName].y / m;
    }
    
    var anim = Raphael.animation({"cx": x + vx, "cy": y + vy}, 100, "linear", function() { this.animate(movement(this)); });
    return anim;
};

// Ball -
//  x, y: specify the initial location of the ball's center
//  radius: the ball's radius
//  vx, vy: specify the ball's initial x and y velocities
Raphael.fn.ball = function(x, y, radius, vx, vy) {
    var ball = this.circle(x, y, radius);
    
    // Get the y-position of ball relative to bottom of canvas
    var bottomOfCanvas = $('#mechanical-canvas').height();   
    ball.position = {"x": x, "y": bottomOfCanvas - y};
    ball.mass = 1;
    ball.velocity = {"vx": vx, "vy": vy};
    ball.forces = {"g": {"x": 0, "y": -2}};
    ball.animate(movement(ball));
    return ball;
};
