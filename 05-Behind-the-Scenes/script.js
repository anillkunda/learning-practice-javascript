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
