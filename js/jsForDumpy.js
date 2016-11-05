// JavaScript паттерны… для чайников
function classAnimal(name) {
this.name = name;
this.getName = function(){
    console.log(this.name);
    return this.name;
}
}
var animal1 = new classAnimal('rabit');
var animal2 = new classAnimal('dog');

animal1.getName();
animal2.getName();

animal1.getName.call(animal2);

var ctx = {
    'en' : 'Hello',
    'fr' : 'Bonjour'
};

var sayHello = function(lang, name){
    for(var key in ctx){
        if(ctx[key] === lang){
            console.log(ctx[key] + ' ' + name);
        }
    }

};
sayHello('en', 'Bill');

Array.prototype.smt = function(){
    var rev = this.reverse();
    console.log(rev);
    // this.
}

[123].smt()

function Ball( param )
{
    this._radius = param.radius;
    this._color = param.color;
}
Ball.prototype = 
{
    constructor: Ball,

    INCREMENTATION_STEP: 5,

    draw: function(){console.log("Ball ball drawn with radius:" + this._radius + " and color: " + this._color)},
    inc: function(){ this._radius += this.INCREMENTATION_STEP }
};

new Ball({ radius:100, color:"red"});

function StripedBall( ball )
{
    this._ball = ball    
}
StripedBall.prototype = 
{
    constructor: StripedBall,

    draw: function()
    {
        this._ball.draw();
        console.log("StripedBall and with stripes");
    },
    inc: function()
    {
        return this._ball.inc();
    }
};

function SpeckledBall( ball )
{
    this._ball = ball    
}
SpeckledBall.prototype = 
{
    constructor: SpeckledBall,

    draw: function()
    {
        this._ball.draw();
        console.log("SpeckledBall and with dots!");
    },
    inc: function()
    {
        return this._ball.inc();
    }
}

var ball1 = new SpeckledBall( new StripedBall( new Ball({ radius:100, color:"red"})));
var ball2 = new StripedBall( new SpeckledBall( new Ball({ radius:100, color:"green"})));
ball1.draw();
ball1.inc();
ball1.draw();
ball2.draw();

