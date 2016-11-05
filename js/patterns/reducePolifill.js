// Array.prototype.reduceMy = function (callback) {
//
//     if (typeof callback !== 'function') {
//         return new Error('callback is not function');
//     }
//     // if(arguments >= 2){
//     //     val = arguments[1];
//     // }
//
//     let res=0;
//
//     let arr = this;
//
//     res += callback(arr[i], arr[i++]);
//
//     return res;
//
//
// };
// //console.log(res == 6);
//
// var res = [1, 2, 3].reduceMy(function (a, b) {
//     return a + b;
// });


// showed prop and value for each property in object
Object.prototype.each = function (f) {
    for (var key in this){
        if(this.hasOwnProperty(key)){
            f.call(this, key, this[key]);
        }

    }
};

var obj = {
    name:'alex',
    age:33
};

obj.each(function (prop, value) {
    console.log(prop, value);
});

String.prototype.repeatMy = function (times) {
    return new Array(times).join(this);
};

'123'.repeatMy(3); // 123123123

Function.prototype.defer = function (time) {
    var func = this;

    return function (a,b) {
        setTimeout(function () {
            func(a,b);
        }, time);
    }

};

function f(a, b) {
    console.log('a+b', a+b);
}

f.defer(1000)(1, 2);
