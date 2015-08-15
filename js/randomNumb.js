//function that creates random numbers with equal probability
var arr = [0,1,2,3,4,5,6,7,8,9];
var randomVal;
var newArr = [];

function Rand() {
	var lenArg = arguments[0];

	if(lenArg >= 0 || newArr.length === arr.length){
		function createRandVal(){
			randomVal = parseInt(Math.random()*10,10);
			return randomVal;
		}
		createRandVal();
		function addRandValue(){
			debugger
			var hasEq = false;
			if(newArr.length == 0){
				newArr.push(randomVal);
			}else{
				newArr.forEach(function (newVal) {
					arr.forEach(function(oldVal){
						if(newVal === oldVal && newVal === randomVal){
							hasEq = true;
						}
					})

				});
				if(hasEq){
					createRandVal();
					addRandValue();
				}else{
					newArr.push(randomVal);
				}
			}
		}
		addRandValue();
		arguments.callee.call(this,lenArg-1);
	}
	console.log("newarr -",newArr);
	console.log("old arr -",arr);
}
Rand(11);