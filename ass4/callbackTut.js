function fetchData(callback) {
    const success = Math.random() > 0.2;
    const data = ["A", "B", "C"];
  
    setTimeout(() => {
      success ? callback(null, data) : callback("Error: Failed to fetch data", null);
    }, 2000);
  }
  
  fetchData((error, data) => {
    error ? console.log(error) : console.log(data);
  });
  