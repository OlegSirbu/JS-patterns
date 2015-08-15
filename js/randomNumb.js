
var arr = [0,1,2,3,4,5,6,7,8,9];
var newArr = [];
var val;
function Rand() {
	if(newArr.length == 0){
		newArr.push(val);
	}else {
		createRand();
		var has = false;
		function  checkArr() {
			newArr.forEach(function (v,i,arr) {
				if(v === val){
					createRand();
					has = true;
					return false;
				}
			});
		}
		if(has){
			checkArr();
		}
if(!has){
	newArr.push(val);
}
	
	}

	function createRand() {
		val = parseInt(Math.random()*10,10);
		return val;
	};
};
Rand();Rand();Rand();
Rand();Rand();Rand();