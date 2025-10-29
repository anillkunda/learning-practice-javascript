'use strict';

// -------** Scoping in Practice

function calcAge(birthYear) {
  const age = 2025 - birthYear;
  const firstName = 'Anil'; // Declaring firstName inside calcAge

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true; // 'var' makes millenial available within the function
      const firstName = 'Manoj'; // Local 'firstName' inside this block
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      // Console log the result of add
      //   console.log(add(2, 3));
    }
    console.log(millenial); // 'millenial' is accessible here due to 'var' hoisting
    console.log(output); // Logs the 'NEW OUTPUT!'
  }

  printAge(); // Calling printAge inside calcAge
  return age;
}

const firstName = 'Anil'; // Outer firstName (this won't affect inner firstName in printAge)
const age = calcAge(1991);
console.log(age); // Logs the age returned from calcAge
// printAge();  // This would cause an error because printAge is not in the global scope

// -------** Hoisting and TDZ in Practice

// ----- VARIABLES
console.log(me); // Works → undefined (because 'var' declarations are hoisted with value undefined)
// console.log(job); // ReferenceError (in TDZ)
// console.log(year); // ReferenceError (in TDZ)

var me = 'Anil';
let job = 'Software Developer';
const year = 2002;

// ----- FUNCTIONS
console.log(addDecl(2, 3)); // Works → 5 (function declarations are hoisted with their definition)
// console.log(addExpr(2, 3)); // ReferenceError (in TDZ for const)
// console.log(addArrow(2, 3)); // TypeError (addArrow is undefined at this point)
console.log(addArrow); // Works → undefined (var is hoisted, initialized as undefined)

// ----- Function declaration
function addDecl(a, b) {
  return a + b;
}

// ----- Function expression
const addExpr = function (a, b) {
  return a + b;
};

// ----- Arrow function assigned to a var
var addArrow = (a, b) => a + b;

// ----- EXAMPLE: Hoisting pitfalls with var
console.log(undefined);
if (!numProducts) deleteShoppingCart(); // Will run → numProducts is undefined (var hoisted)
// Because 'var numProducts' is hoisted and initialized as undefined, the condition is true,
// so deleteShoppingCart() runs even though numProducts is declared later.

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

// ----- GLOBAL VARIABLES (window/globalThis check)
var x = 1;
let y = 2;
const z = 3;

// On browsers:
// window.x === 1 because 'var' creates a property on the global object
// but 'let' and 'const' do NOT.
console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false

// -------** The this Keyword in Practice

console.log(this); // global object (window in browser)

const calcAgeFn = function (birthYear) {
  console.log(2025 - birthYear);
  console.log(this); // undefined in strict mode
};
calcAgeFn(2002);

const calcAgeArrowFn = (birthYear) => {
  console.log(2027 - birthYear);
  console.log(this); // inherits this from lexical scope (global)
};
calcAgeArrowFn(2003);

const anilObj = {
  year: 2002,
  calcAge: function () {
    console.log(this); // jonasObj
    console.log(2025 - this.year);
  },
};
anilObj.calcAge();

const matilda = {
  year: 2017,
};
matilda.calcAge = anilObj.calcAge;
matilda.calcAge(); // this -> matilda

// const f = anilObj.calcAge;
const f = anilObj.calcAge.bind(anilObj);
f(); // this -> undefined in strict mode
anilObj.calcAge();
