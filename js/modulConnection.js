// var module = (function(n) {
//     var connections = [
//       //{a:[c]}
//       //{b:[c]}
//     ];
//     return {
//       connect: function(a, b) {
//         function pushNewCon(a,b){
//           connections.push({a:[b]});
//           connections.push({b:[a]});
//         }
//         if(connections.length == n){
//           return 'module is full';
//         }
//         if(connections.length == 0){
//           pushNewCon(a,b);
//         }else{
//           var indexHasCon = [];
//           // есть ли в конекшене созданый обьект
//           for (var i=0; i<connections.length;i++) {
//             var nameCon = Object.keys(connections[i])[0];// in object {a:['c']} => 'a'
//              if( nameCon == a || nameCon == b){
//                 indexHasCon.push(i);
//              }
//           }
//           if(!indexHasCon){
//             pushNewCon(a,b);
//             return false;
//           }
//           if(indexHasCon.length == 2){
//             return 'now is connection '+ a + " with "+ b;
//           }
//           if(indexHasCon){
//             var indexEl = indexHasCon[0];
//             //connections[indexEl]  {a:[c]} => a
//             var arrIndexEl = connections[indexEl][Object.keys(connections[indexEl])[0]];// {a:[c,d]} => [c,d]
//             //{a:[c]}
//             //{b:[c]}      
//             for (var j=0; j<arrIndexEl.length;j++) {
//               if(arrIndexEl[j] == a){
                
//               }
//             }

//           }
//         }
          

//          //  for (var i=0; i<connections.length;i++) {
//          //    debugger
//          //    //Object.keys(connections[i])[0] {a:[c]} ret a;
//          //    //connections[i][Object.keys(connections[i])[0]]; ret 'c'
//          //    var connEl = 
//          //      connections[i][Object.keys(connections[i])[0]];

//          //    //var index = Object.keys(connections[id])[0];
//          //    // if(connections.indexOf(index) === -1){
//          //    //   connections.push({a:[b]});
//          //    //   connections.push({b:[a]});
//          //    // }else{
//          //    //   connections[connections.indexOf(index)]
//          //    // }

//          // }
//         }
//       },
//       is_connected: function(a, b) {
//       }         
//     };
// })(10);
// // 
// module.connect('a','c');
// module.connect('b','c');

var module = (function(n){
  //n = 10
var data=[];
for (var i = 0; i < n; i++) {
  data.push(i);
};
//data =[0,1,2,3,4,5,6,7,8,9];

return {
  con: function(a,b){
  for (var i = 0; i < data.length; i++) {
        if(data[i] == a){
          
        }
      };    
  },
  is_con: function(a,b){
    if(data[0].length == 10){
      return a+' is connected '+b;
    }

  }
}
})(10)

module.con(0,5);
module.con(5,6);

module.con(4,5);
module.is_con(4,5); // true
module.con(1,5);
