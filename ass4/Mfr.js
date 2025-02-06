function processData(numbers, callback) {
    return callback(numbers);
  }
  
  function filterOdd(numbers) {
    return numbers.filter(num => num % 2 !== 0);
  }
  
  function doubleNumbers(numbers) {
    return numbers.map(num => num * 2);
  }
  
  function calculateSum(numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }
  
  function findMaxNumber(numbers) {
    return numbers.reduce((max, num) => (num > max ? num : max), -Infinity);
  }
  
  const numbers = [1, 2, 3, 4, 5, 6];
  
  console.log(processData(numbers, filterOdd));
  console.log(processData(numbers, doubleNumbers));
  console.log(processData(numbers, calculateSum));
  console.log(processData(numbers, findMaxNumber));
  