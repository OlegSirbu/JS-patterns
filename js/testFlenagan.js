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



// //фибоначи метод
// var fibonacci = (function(){
// 	var memo = [0,1];
// 	var fib = function(n){
// 		var res = memo[n];
// 		if(typeof res !== 'number'){
// 			res = fib(n-1) + fib(n-2);
// 			memo[n] = res;
// 		};
// 		return res;
// 	};
// 	return fib;
// }());
// var fibonacci = memoizer([0,1], function(recur, n) {
// 	return recur(n -1) + recur(n - 2);
// });

//фибоначи метод

// memoizer 
var memoizer = function (memo,formula) {
	var recur = function (n) {
		var result = memo[n];
		if( typeof result !== 'number') {
			result = formula (recur, n);
			memo[n] = result;
		}
		return result;
	}
	return recur;
};



// Пример клика с замыканием
var divs = $.find('div');
function addEvents2(divs) {
	for(var i=0; i<divs.length; i++) {
		divs[i].onclick = function(x) {
			return function() {
				// alert(x+ ' ----'+ this.innerText);
			}
		}(i);
	}
}
addEvents2(divs);

var theThing = null;
var replaceThing = function () {
    var priorThing = theThing;
    var unused = function () {
        // 'unused' - единственное место, где используется 'priorThing',
        // но 'unused' никогда не вызывается
        if (priorThing) {
            console.log("hi");
        }
    };
    theThing = {
        longStr: new Array(1000000).join('*'),  // создаем 1Mб объект
        someMethod: function () {
            console.log(someMessage);
        }
    };
};
setInterval(replaceThing, 1000);


var one = {
	name:'obj',
	say: function(greet){
		return greet +', '+this.name;
	}
};
var two = {
	name:'another'
};

one.say.apply(two,['hello']);

var or = {
	'x':1,
	'y':"string",
	'arr':[1,2,3,11]
}

// практика по класам

function myFunct () {
    myFunctThis = this;
}

myFunct.prototype.myProp = 888;

var init = new myFunct();
// console.log("myFunct.prototype.isPrototypeOf(init)");
// console.log(myFunct.prototype.isPrototypeOf(init));

// console.log(init instanceof   myFunct);

// console.log(init);
// console.log(init == myFunctThis);
// console.log(init.myProp);


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
	Transformer.call(this, name , clan);
	this.carModel = carModel;
};

var bambellbee = new Avtobot("Alex", "Megatron", "Chevrole Camoro!");

// console.log(bambellbee);

// console.log("\n");

var transformer1 = new Transformer("warBoth", "clanWar");
// console.log(transformer1);
// console.log(transformer1.getName());

// console.log("\n");

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
	debugger;
}
function ClassB(argument) {}
ClassB.prototype = new ClassA();
var a = new ClassB();
a.sayHi('Hello');
	debugger;
a.name = 'a1';


function ClassA(){
	this.name = '111';
}
ClassA.prototype.say = function (){
	console.log('aaa');
}
function ClassB(){}
inherit(ClassB,ClassA);
var a1 = new ClassB();
a1.say();
a1.name = 'w';
function inherit(child,parent){
	debugger;
	var F = function () {};
	F.prototype = parent.prototype;
	child.prototype = new F();
}

function foo3(){
	var bar  = function (argument) {
		return "second bar";
	}

	function bar (argument) {
		return "first bar";
	}
	return bar();
}

console.log(foo3());

// полное копирование обьекта
function extendDeep(parent, child){
	var i,
		toStr = Object.prototype.toString,
		astr = '[object Array]',
		child = child || {};

		for(i in parent){
			if(parent.hasOwnProperty(i)){
				if(typeof parent[i] === 'object'){
					child[i] = (toStr.call(parent[i]) === astr) ? [] : {}; 
					extendDeep(parent[i], child[i]);
				}else{
					child[i] = parent[i];
				}
			}
		}
		return child;
}

var dad = {
	counts:[1,2,3],
	reads: {paper : true}
}
var kid = extendDeep(dad);
console.log('dad',dad);
console.log('kid',kid);
// полное копирование обьекта


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


function min(x,y){
	if(x<y){
		return x;
	} else if (x>y) {
		return y;
	} else {
		return  x+' = '+ y;
	}
}

function isEven(x){
	var y = Math.abs(x);
	if(y%2==1){
		return false;
	}
	return true;
}

function countBs(x,y){
	var arr = x.split(''),
		i=0;
		countB=0;
	for (i in arr) {
		if(arr[i] === (y)){
			countB++;
		}
	}
	return countB;
}


var number = 0;
var str='';
while (number <= 7) {
  // console.log(str+='#');
  number++;
}

function FizzBuzz(){
	var num = 0;
	while(num <= 99){
		if((num % 5 == 0) && (num % 3 == 0)) {
			// console.log("FizzBuzz");
		}else if(num % 5 == 0) {
			// console.log("Buzz");
		}else if(num % 3 == 0){
			// console.log("Fizz");
		} else {
			// console.log(num);
		}
		num++;
	}
}
FizzBuzz();


function chess(x,y){
	var str='',
		pr='__',
		reh ='#';

	for (var i = 0; i < x; i++) {
		for (var j = 0; j < y; j++) {
			if(i%2==0){
				(j%2==0) ?str += pr
						:str += reh;
			} else{
				(j%2==0)? str += reh
						: str += pr;
			}
		};
		str+='/n';
	};
	
	return str;
}
chess(4,4);


// var mySequence = continueSequence([  1, 4, 7, 10  ]);

function continueSequence(args){
	var step = args[1] - args[0],
		n=0,
		newN;
		return function(){
			newN = args[args.length-1] + step;
			console.log(args[args.length-1] + step);
			// debugger
			return args.push(newN);
		}

	
	newN = args[args.length-1] *step;
	console.log(newN);
	args[n]	
}

var r = continueSequence([  1, 4, 7, 10  ]);
r();
r();

var createHelloFunction = function(name) {
	// debugger
	var c = 0;
   return function() {
   	  	// console.log('c',c);
		// console.log('Hello, ' + name);
      return function(){
      	// c++;
      	// console.log('c',c);
      	// console.log('!!! ' + name+'!!!');

      	return function () {
      		// c++;
      		var r = 0
      		r++;
      		console.log('r',r);
      		// console.log('c',c);
      	};
      };
   };
}
var sayHelloHabrahabr = createHelloFunction('Habrahabr');
// sayHelloHabrahabr();
// sayHelloHabrahabr()();
// sayHelloHabrahabr()()();
console.clear();

// (function(){
// 	var r = 1;
// 	console.log('r',r);
// 	r++
// 	console.log('r++',r);
// 	sayHelloHabrahabr()()();
// 	console.log('r',r);
// })();

// С помощью замыкания мы можем сделать методы и свойства, которые вне объекта не используютя, приватными (т.е. доступными только ему):
var MyModule = (function() {
   var name = 'Habrahabr';
   function sayPreved() {
      console.log('PREVED ' + name.toUpperCase());
   }
   function sayHELLO(){
   	sayPreved();
   }
   return {
      sayPrevedToHabrahabr: function() {
         sayHELLO()
      }
   }
})();
// debugger;
MyModule.sayPrevedToHabrahabr(); //alerts «PREVED Habrahabr»

function f (){
	var x = 1;
	console.log(this.x);
}

var b = f.bind({x:3})
b();

function fBind(y,z) {return console.log(this.x+y+z);}
var g = fBind({x:1},1);
g(3);


function formatFile(name){
	var t = name.slice(name.lastIndexOf('.'),name.length);
	console.log(name ,t)
}
// console.time("Array ");
// formatFile('abcd.js');
// formatFile('abcd.js.jsk');
// console.timeEnd("Array ");

function getExtension(filename) {
    var fragments = filename.split(".");
    fragments[fragments.length - 1];
    // console.log(filename, fragments);

}

// console.time("Array initialize");
// getExtension('abcd.js');
// getExtension('abcd.js.jsk');
// console.timeEnd("Array initialize");


// console.time("for mil ++");
// for(var i = 0; 1000000>i; i++)
// console.timeEnd("for mil ++");


// console.time("for mil -- ");
// for(var i = 1000000; i--;)
// console.timeEnd("for mil -- ");

// var str = 'abcde';
// var arr =str.split('');


for(var i = 0; i < 10; i++) {
    (function(e) {
        setTimeout(function() {
            console.log(e);
        }, 1000);
    })(i);
}

function Counter(start) {
    var count = start;
    return {
        increment: function() {
            count++;
        },

        get: function() {
            return count;
        }
    }
}

var foo = Counter(4);
foo.increment();
foo.get(); // 5
foo.ab()

function  checkDiffState(a,b) {
	if(a.lenght === b.lenght){
		return false;
	}

	for (var i = a.length; i>=0; i--) {
		if(a[i][0] === b[i][0]){
			return false;
		}
	};

}

//плагин JQ
 (function( $ ){

  var methods = {
    init : function( options ) { 
    	console.log('init', options)
    },
    show : function( ) {
    	console.log('show')
    },
    hide : function( ) {
    	console.log('hide')
    },
    update : function( content ) {
    }
  };

  $.fn.tooltip = function( method ) {
    // логика вызова метода
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
    } 
  };

})( jQuery );

// вызывает метод init
$('div').tooltip(); 

// вызывает метод init
$('div').tooltip({
  foo : 'bar'
});
//плагин JQ




function min(x,y){
	if(x<y){
		return x;
	}else if(x>y){
		return y;
	} else{
		return  x+' = '+ y;
	}
}

function isEven(x){
	var y = Math.abs(x);
	if(y%2==1){
		return false;
	}
	return true;
}

function countBs(x,y){
	var arr = x.split(''),
		i=0;
		countB=0;
	for (i in arr) {
		if(arr[i] === (y)){
			countB++;
		}
	}
	return countB;
}


var number = 0;
var str='';
while (number <= 7) {
  // console.log(str+='#');
  number++;
}

function FizzBuzz(){
	var num = 0;
	while(num <= 99){
		
		if((num % 5 == 0) && (num % 3 == 0)) {
			// console.log("FizzBuzz");
		}else if(num % 5 == 0) {
			// console.log("Buzz");
		}else if(num % 3 == 0){
			// console.log("Fizz");
		} else {
			// console.log(num);
		}
		num++;
	}
}
FizzBuzz();


function chess(x,y){
	var str='',
		pr='__',
		reh ='#';

	for (var i = 0; i < x; i++) {
		for (var j = 0; j < y; j++) {
			if(i%2==0){
				(j%2==0) ?str += pr
						:str += reh;
			} else{
				(j%2==0)? str += reh
						: str += pr;
			}
		};
		str+='/n';
	};
	
	return str;
}
chess(4,4);


function PrefixInteger(num, length) {
    return (num / Math.pow(10, length)).toFixed(length).substr(2);
}
PrefixInteger(20,3)


console.clear();
// Вывести таблицу, в которой числа располагаются по спирали.
function myPop() {
if (this.length != 0){
		var last = this[this.length-1];
		this.length--;
		return last;
	}
}
Array.prototype.pop = function myPop() {
if (this.length != 0){
		var last = this[this.length-1];
		this.length--;
		return last;
	}
};

Array.prototype.sortNumb = function mySortNumb() {
	
}

var tableSpiral =  document.createElement("div");
var arrayNumb = [1,2,3,4,5,6,7,10,15,20,24,30,45,67,5,6,2,7,20,91];

// var text = document.createTextNode("some text");   
// var text1 = document.createTextNode("some text1");   
// tableSpiral.appendChild(text);
// tableSpiral.appendChild(text1);


document.body.appendChild(tableSpiral); 
// Вывести таблицу, в которой числа располагаются по спирали.


// console.log = log
window.log = function() {
  try {
    return console.log.apply(console, arguments);
  } catch (_error) {}
};


// promise
var index, promise, promises_ary, _i;
rand = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

promises_ary = [];

for (index = _i = 0; _i < 10; index = ++_i) {
  promise = (function(index) {
    var dfd;
    dfd = new $.Deferred();
    
    setTimeout(function() {
      log(index);
      return dfd.resolve();
    }, rand(1, 5) * 1000);

    return dfd.promise();
  })(index);

  promises_ary.push(promise);
}

$.when.apply($, promises_ary).done(function() {
  return log('Promises Ary is Done');
});


var str2 = 'helo';

String.prototype.repeatText = function (n){
var strRepeat = '';
if(n > 0){
	console.log(n)
	console.log(this)
	for (var i = 0; i < n; i++) {
	strRepeat += this	
	};
	return strRepeat;
}

}

console.log(str2.repeatText(3))



var fullname = 'John Doe';
var obj = {
   fullname: 'Colin Ihrig',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};
 
console.log(obj.prop.getFullname());
 
var test = obj.prop.getFullname;
 
console.log(test());


var load = function(){
	console.log('load');
}

var func = function(){
	console.log('func');
	load();
}
func()



// sum(1)(2) = 3
// sum(5)(-1) = 4

function sum(a){
	return function (b){
		return a+b;
	}
}

function makeBuffer(){
	var textLocal = '';
	return function(text){
		if(arguments.length == 0){
			return textLocal;
		}
		textLocal +=text;
	}

}

var buffer = makeBuffer();
// добавить значения к буферу
buffer('Замыкания');
buffer()

buffer(' Использовать');
buffer(' Нужно!');

buffer()

var users = [{
  name: "Вася",
  surname: 'Иванов',
  age: 20
}, {
  name: "Петя",
  surname: 'Чапаев',
  age: 25
}, {
  name: "Маша",
  surname: 'Медведева',
  age: 18
}];

users.sort(byField('name'));

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
  }
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

var someObj = new SomeFunction ();



function f(a){
	return this.x + a;
}
var o = {x:1}
var g = f.bind(o);
g(3);


var reduceArray = [1,2,3,4,5]
console.log(reduceArray.reduce(function(x,y){return x+y} ))


function contSeq(arg){
	return function() {
var newArg, sum;
	
	if(arg !== newArg){
		newArg = arg;	
	}

	var a = arg[arg.length-1] - arg[arg.length-2];
	debugger
	sum = arg[arg.length-1] + a;
	newArg.push(sum);
	
	console.log(sum)
	console.log(newArg);
	}
	
}

var mySeq = contSeq([1,4,7,10])
mySeq()
mySeq()



function isEven(a){
	if(a%2){
		console.log('false')
	} else {
		console.log('true')
	}

}
isEven(50)
isEven(75)


function countsB(str){
	 	var contB=0;
 		str.split('').forEach(function(v,i,a){
			if(a[i] == 'b'){
				contB++;
			}			
		});
	 	return contB;
}
countsB('abfb');



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


function Bevarage(name, temprature){
	this.name = name;
	this.temprature = temprature;
}
Bevarage.prototype.drink = function(){
	console.log('I`m drinking'+ this.name);
};

function Coffee(type){
	Bevarage.call(this, 'coffee','hot');
	this.type = type;
}
Coffee.prototype = Object.create(Bevarage.prototype);
Coffee.prototype.sip = function(){
	console.log('Sipping some '+this.name+''+this.type);
}
var water = new Bevarage('water','cold');
var coffee = new Coffee('coffee','hot');

var o = {x:1};
var p = Object.create(o);
p.y = 2;
var q = Object.create(p);
q.z = 3;
console.log(q.z+q.y+q.x);

var sum = function (x,y) {
	debugger;
	return x+y;
}
var suc = sum.bind(null,1);
suc(3);