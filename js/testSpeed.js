function formatFile(name){
	var t = name.slice(name.lastIndexOf('.'),name.length);
	console.log(name ,t)
}
console.time("Array ");
formatFile('abcd.js');
formatFile('abcd.js.jsk');
console.timeEnd("Array ");


function getExtension(filename) {
    var fragments = filename.split(".");
    fragments[fragments.length - 1];
    console.log(filename, fragments);

}
console.time("Array initialize");
getExtension('abcd.js');
getExtension('abcd.js.jsk');
console.timeEnd("Array initialize");


console.time("for mil ++");
for(var i = 0; 100000>i; i++)
console.timeEnd("for mil ++");


console.time("for mil -- ");
for(var i = 10; i--;){
console.log(i);
}
console.timeEnd("for mil -- ");

var jsonObj = '{"aeset":{"id":0,"anchortype":"G","anchortext":[],"version":"C3.0"},"aeset-atts":{}}';

console.time("$");
$.parseJSON(jsonObj)
console.timeEnd("$");

console.time("js");
JSON.parse(jsonObj)
console.timeEnd("js");
('40 proc faster')


function add () {
	arr = [];
	for(var i=10000000;i>0;i--){
		arr.push(i);
	}
	return arr;
}
console.time('add');
add()
console.timeEnd('add');

console.time('each');
$.each(arr,function (i,val) {
	arr.push(arr[i]++)
})
console.timeEnd('each');

console.time('for each');
arr.forEach(function (i,val,arr) {
	arr.push(arr[val]++)
})
console.timeEnd('for each');