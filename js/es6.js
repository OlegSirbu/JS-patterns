/**
 * Created by oleg on 14.05.16.
 */


// test new features from es 6

'use strict';

// use promise
let prom = new Promise((res, rej) => {
   res('new data');
    console.log('22');
}).then(
    (data) => {
        console.log(data);
    }
).catch((data) => {
    console.log(data);
});


function showMenu(title = "Без заголовка", width = 100, height = 200) {
    alert(`${title} ${width} ${height}`);

}

showMenu("Меню");
