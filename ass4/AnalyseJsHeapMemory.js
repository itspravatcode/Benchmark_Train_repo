let leakyArray = [];

function addDataToLeakyArray() {
  const data = new Array(100000).fill("leak"); 
  leakyArray.push(data); 
  console.log(`Leaky Array Length: ${leakyArray.length}`);
}

function cleanup() {
  leakyArray = [];
  console.log("Leaky array cleaned up to prevent memory issues.");
}


const intervalId = setInterval(addDataToLeakyArray, 1000);


setTimeout(() => {
  clearInterval(intervalId);
  cleanup();
}, 90000);
