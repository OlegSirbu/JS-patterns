'5' + 4 // 54
5 + '4' // 54
5 + + '4' // 9
'5' * '2' // 10
'2px' + 4 // 2px4
'a' > 'A' // true
------------------------
var i = 5;
{
  var i = 1;
}
// i = 1
------------------------
alert[alert] = "Hello World";
alert(alert[alert]); // "Hello World"
------------------------
[1, 2, 3] + 1 // 1,2,31
'$' + 5 + 4 // $54
3 / 0 // Infinity
12 - 'px' // NaN
------------------------
var foo = '1';
var bar = '2';
foo -= bar -= ' is string';
// foo = NaN
// bar = NaN
------------------------
var foo = 5.44444;
~~foo; // 5
------------------------
null == undefined // true
null === undefined // false
null == 0 // false
null > 0 // false
null >= 0 // true
void 0 // undefined
NaN === NaN // false
3 > 2 > 0 // true
3 > 2 > 1 // false
Number.NEGATIVE_INFINITY + Number.POSITIVE_INFINITY // NaN
------------------------
7 && 2 // 2
2 && 7 // 7
0 && 2 // 0
-1 && 2 // 2
(1, 2, 3, 4, 5) // 5
------------------------
typeof null // object
null instanceof Object // false
typeof NaN // number
typeof [1,2] // object
typeof(3) // number
isFinite(undefined) // false
isFinite(null) // true
null == false // false
!null // true
+!{}[0] // 1
------------------------
3.toString() // SyntaxError: Unexpected token ILLEGAL
3 .toString() // "3"
3..toString() // "3"
(3).toString() // "3"
------------------------
[1, 2] instance of array // true
[1, 2] instance of object // true
------------------------
var f = function() {};
f.call('test'); // String {0: "t", 1: "e", 2: "s", 3: "t", length: 4}
------------------------
var fn = function() {
  retutn this;
};
fn.call(null); // window
------------------------
var Array = 100;
var foo = new Array(); // TypeError: number is not a function
------------------------
alert(111111111111111111111); // alerts 111111111111111110000
------------------------
var x = [typeof 5, typeof null][1] // x === 'string'
------------------------
// Singleton pattern
var isSing = {
  foo: 1,
  fn: function() {}
};

var isSingTwo = (function() {
  var i = 0,
      bar = 'test';

  return {
    getBar: function() {
      return bar;
    }
  };
}());

const isSingThree = (function() {
  var Constr = function() {
        this.foo = 'test';
      },
      instance = null;

  return {
    getInstance: function() {
      return instance || (instance = new Constr);
    }
  };
}());
------------------------
// Минимальный и максимальный элемент в массиве
var foo = [1, 2, 3];
Math.min(foo); // NaN
Math.min.apply(Math, foo); // 1
Math.max.apply(Math, foo); // 3
------------------------
// Эмуляция $ из jQuery
var $ = document.querySelectorAll.bind(document);
// пример
$("#element_id");

// Эмуляция "on" из jQuery
// https://developer.mozilla.org/en-US/docs/Web/API/element
Element.prototype.on = Element.prototype.addEventListener;
// example
$("#element_id")[0].on("click", handleClick, false);
------------------------
// Слияние массивов
var foo = [1, 2, 3];
foo.push.apply(foo, [4, 5, 6]);
// или
var foo = [4, 5, 6]
bar = [1, 2, 3].concat(foo); // 1, 2, 3, 4, 5, 6

"hello my name is Mike".split("").reverse().join("");
// ekiM si eman ym olleh
"hello my name is Mike".split(" ").reverse().join(" ");
// Mike is name my hello
------------------------
// Клонирование массива
var foo = [1, 2, 3];
var bar = foo.slice(0); // bar = [1, 2, 3]