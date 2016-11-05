

// create unic object

function Universe() {
    var inst = this;
    this.created = true;

    Universe = function () {
        return inst;
    };
    Universe.prototype = this;
    inst = new Universe();
    inst.constructor = Universe;

}

var galactic1 = new Universe();
var galactic2 = new Universe();
console.log(galactic1.created);
console.log(galactic2.created);
console.log(galactic1 === galactic2);

