
//7
function range(a,b) {
	var array=[];

	function pushArray(x,y){
		for (var i = 0; i < y+1; i++) {
			debugger;
			array.push(i+1);
		};
		return array;
	}

	if(a > b ){
		pushArray(b,a);
	} else {
		pushArray(a,b);
	}
}
range(1,5);

//8
function reverseArray (array){
	var newArray=[];
	array.forEach(function(v){
		newArray.unshift(v);
	});
	return newArray;
}
reverseArray(['A','B','C','D']);


//9
function arrayToList (arr) {
	var list={};

	// list = {
	// 	value: 'A'
	// 	rest: {
	// 		value: 'B',
	// 		rest: {
	// 			value: 'C'
	// 			rest: null
	// 		}
	// 	}
	// }

}

arrayToList(['A','B','C']);
//10
function deepEquel(a,b){
	for( var x in a){
		for(var y in b){
			debugger;
			if(a[x] === b[y]){
				return console.log('true')
			} else {
				return console.log('false')
			}	
		}
	}
}
var objEq = {here:1, obj:2};
var objEq2 = {here:2, obj:"2"};

deepEquel(objEq, objEq);

//11

function svert(arrays){
	var newArray=[];
	arrays.forEach(function(val,i,arr){
		debugger
		if(arr[i] instanceof Array){
			newArray = newArray.concat(arr[i]);
		} else {
			newArray.push(val)
		}
	})
}
svert(arrays);

var arrays = [[1, 2, 3], [4, 5], [6], 7];
arrays.reduce(function (x,y) {
	var newArray = [];
	debugger;
	if(x instanceof Array){
		newArray = newArray.concat(x);
	} else {
	}
})