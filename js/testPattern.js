var basketModule = (function () {
	var basket =[];
	return {
		addIdem: function(val){
			basket.push(val);
		},
		getItemCount: function(){
			return basket.length;
		},
		getTotal: function(){
			var q = this.getItemCount(), p=0;
			while(q--){
				p+=basket[q].price;
			}
			return p;
		}
	}
}());

// basketModule - это объект со свойствами, которые могут также быть и методами:
basketModule.addItem({item: ' bread', price: 0.5});
basketModule.addItem({item: ' butter', price: 0.3});


var module = (function() {
	var _private = {
		i: 5,
		get: function() {
			console.log( ' Текущее значение: ' + this.i) ;
		},
		set: function( val) {
			this.i = val;
		},
		run: function() {
			debugger
			console.log( ' процесс запущен' ) ;
		},
		jump: function(){
			console.log( ' резкое изменение' ) ;
		}
	};
return {
	facade: function( args) {
		_private.set( args.val) ;
		_private.get( ) ;
		if ( args.run) {
			_private.run( ) ;
		}
	}
}
}()) ;
module.facade( {run: true, val: 10}) ;


/* ==========================================================================
 * A "Hello World"-like example of Javascript using the MVC pattern.
 * ========================================================================== */



/*
 * Model
 */

// a model is where the data object is created.
var ModelExample = function ( data ) {
	// the model instance has a property called "myProperty"
	// created from the data's "yourProperty".
	this.myProperty = data.yourProperty;

	// return the model instance
	return this;
};

// a model constructor might have a function that creates new model instances.
ModelExample.find = function ( id ) {
	// data used to create a new model may come from anywhere
	// but in this example data comes from this inline object.
	var ourData = {
		'123': {
			yourProperty: 'Hello World'
		}
	};

	// get a new model instance containing our data.
	var model = new ModelExample(ourData[id]);

	// return the model.
	return model;
};



/*
 * View
 */

// a view is where the output is created.
var ViewExample = function ( model ) {
	this.model = model;

	return this;
};

// a view might have a function that returns the rendered output.
ViewExample.prototype.output = function () {
	// data used to create a template may come from anywhere
	// but in this example template comes from this inline string.
	var ourData = '<h1><%= myProperty %></h1>';

	// store this instance for reference in the replace function below
	var instance = this;

	// return the template using values from the model.
	return ourData.replace(/<%=\s+(.*?)\s+%>/g, function (m, m1) {
		return instance.model[m1];
	});
};

// a view might have a function that renders the output.
ViewExample.prototype.render = function () {
	// this view renders to the element with the id of "output"
	document.getElementById('output').innerHTML = this.output();
};



/*
 * Controller
 */

// a controller is where the model and the view are used together.
var ControllerExample = function () {
	return this;
};

// this function uses the Model and View together.
ControllerExample.prototype.loadView = function ( id ) {
	// get the model.
	var model = ModelExample.find( id );

	// get a new view.
	var view = new ViewExample(model);

	// run the view's "render" function
	view.render();
};


/*
 * Example
 */

function bootstrapper() {
	var controller = new ControllerExample;
	controller.loadView(123);
}

bootstrapper();

// шаблоны Стефан Стоянов

function Waffle (argument) {
	debugger;
	if(!(this instanceof Waffle)){
		return new Waffle();
	}
	this.tastes = 'yammmm';
}
var first = Waffle()


function Bevarage(name, temprature){
	this.name = name || "name";
	this.temprature = temprature || "undefined";
}
Bevarage.prototype.drink = function(){
	console.log('I`m drinking '+ this.name + " "+ this.temprature);
};
function Coffee(name, type){
	Bevarage.call(this, name, type);
	this.type = type;
}
Coffee.prototype = Object.create(Bevarage.prototype);
Coffee.prototype.sip = function(){
	console.log('Sipping some '+this.name+' '+this.type);
}
var water = new Bevarage('water','cold');
var coffee = new Coffee('coffee','hot');


var Vector = function (x,y){
	this.x = x;
	this.y = y;
};
Vector.prototype.getX = function(){
	return this.x;
}
Vector.prototype.getY = function(){
	return this.y;
}
Vector.prototype.plus = function(vector){
	this.x += vector.x;
	this.y += vector.y;
	debugger;
}
Vector.prototype.minus = function(vector){
	this.x -= vector.x;
	this.y -= vector.y;
	debugger;
}

var vector = new Vector(1,1);
vector.getX();
vector.plus(new Vector(2,3));
vector.minus(new Vector(1,1));


function SomeFunction () {
  var instance;
  SomeFunction = function () {
     return instance;
  }
  SomeFunction.prototype = this;
  instance = new SomeFunction ();
  instance.constructor = SomeFunction;
  instance.property1 = 'value';
  instance.property2 = 'value';
  return instance;
}

function SomeFunction () {
  var instance;
  SomeFunction = function () {
    return instance;
  };
  this.property1 = 'value';
  this.property2 = 'value';
  instance = this;
}
function SomeFunction () {
   if (typeof (SomeFunction.instance) == 'object') {
     return SomeFunction.instance;
   }
   this.property1 = 'value';
   this.property2 = 'value';
   SomeFunction.instance = this;
   return this;
}

SomeFunction.prototype.method1 = function () {
}



// фабрика
function CarMarket(){}
CarMarket.prototype.drive = function(){
	return 'Vroom. I have '+ this.doors+' doors';
}

CarMarket.factory = function(type){
	var constr= type,newcar;
		if(typeof CarMarket[constr] !== 'function'){
			throw{
				name:"Error",
				message: constr + 'exist'
			};
		}

		if(typeof CarMarket[constr].prototype.drive !== 'function'){
			CarMarket[constr].prototype=new CarMarket();
		}
		newCar = new CarMarket[constr]();
		return newcar;
}
CarMarket.Compact = function(){
	this.doors = 4;
};
CarMarket.Convertible = function(){
	this.doors = 2;
};
CarMarket.SUV = function(){
	this.doors = 24;
};
var suv = new CarMarket.SUV();
console.log(suv.doors);
console.log(suv);

// пример Множества
function Set () {
	this.values = {};
	this.n = 0;
	this.add.apply(this,arguments);
};

Set.prototype.add = function() {
	for (var i = 0; i < arguments.length; i++) {
		var val = arguments[i];
		var str = Set._v2s(val);
		if(!this.values.hasOwnProperty(str)){
			this.values[str] = val;
			this.n++;
		}
	}
	return this;
};

Set.prototype.remove = function  () {
	for (var i = 0; i < arguments.length; i++) {
		var str = Set._v2s(arguments[i]);
		if(this.values.hasOwnProperty(str)){
			delete this.values[str];
			this.n--;	
		}
	}
	return this;
};

// создание класса без оператора new 

NotOperNew = function(name,lastname) {
	if(!(this instanceof NotOperNew)) {
		return new NotOperNew(name,lastname);
	}
	this.name = name;
	this.lastname = lastname;
};

var info = NotOperNew("Oleg","Sirbu");
// 

Transformer = function (name , clan) {
    this.name = name;
    this.clan = clan;
};
Transformer.prototype.getName = function(){
    return this.name;
};
Transformer.prototype.setName = function(newName){
    this.name = newName;
};
Avtobot = function(name, clan, carModel){
	Transformer.call(this, name, clan);
	this.carModel = carModel;
};

var bambellbee = new Avtobot("Alex", "Megatron", "Chevrole Camoro!");
// console.log(bambellbee);
// console.log("\n");
var transformer1 = new Transformer("warBoth", "clanWar");
// console.log(transformer1);
// console.log(transformer1.getName());

function inherit(child,parent){
	debugger;
	var F = function () {};
	F.prototype = parent.prototype;
	child.prototype = new F();
}

Parent = function(){
	this.val = true;
};
Child = function(){
	this.val = false;
};
Child.prototype = new Parent();
function  ClassA(name) {
	this.name = name||'Alan';
}
ClassA.prototype.sayHi = function (mes) {
	console.log(mes);
}
function ClassB(argument) {}
ClassB.prototype = new ClassA();
var a = new ClassB();
a.sayHi('Hello');
a.name = 'a1';



// шаблон 2 page 154
function Article(){
	this.tags = ['js','css'];
	debugger
}
var article= new Article();
function BlogPost(){}
BlogPost.prototype = article;
var blog = new BlogPost();
function Staticpage(){
	debugger
	Article.call(this);
}
var page = new Staticpage();
// alert(article.hasOwnProperty(‘tags’)); // true
// alert(blog.hasOwnProperty(‘tags’)); // false
// alert(page.hasOwnProperty(‘tags’)); // true

// шаблон 3
// родительский конструктор
function Parent(name) {
 this.name = name || 'Adam';
 debugger
}
// добавление дополнительной функциональности в прототип
Parent.prototype.say = function () {
 return this.name;
};
// дочерний конструктор
function Child(name) {
 Parent.apply(this, arguments);
}
// Child.prototype = Parent.prototype;
inherit(Child,Parent);
var kid = new Child("Patrick");
kid.name; // “Patrick”
kid.say(); // “Patrick”
delete kid.name;
kid.say(); // “Adam”

function inherit(C, P) {
	debugger
 var F = function () {};
 F.prototype = P.prototype;
 C.prototype = new F();
}

var one = {
 name: 'object',
 say: function (greet) {
 return greet + ', ' + this.name;
 }
};
// проверка
one.say('hi'); // 'hi, object'
var two = {
	name: 'another'
}
one.say.apply(two, ['hello']);


function Universe() {
 // сохраненный экземпляр
 var instance = this;
 // создать новый экземпляр
 this. start_time = 0;
 this.bang = 'Big';
 // переопределить конструктор
 Universe = function () {
 return instance;
 };
}
// проверка
var uni = new Universe();
var uni2 = new Universe();
uni === uni2; // true

