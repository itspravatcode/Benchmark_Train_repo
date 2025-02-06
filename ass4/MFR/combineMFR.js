const products = [
    { name: "Laptop", price: 800, category: "Electronics" },
    { name: "Chair", price: 120, category: "Furniture" },
    { name: "Headphones", price: 150, category: "Electronics" },
    { name: "Table", price: 200, category: "Furniture" }
  ];
  
  function getTotalPriceByCategory(category) {
    return products
      .filter(product => product.category === category)
      .map(product => product.price)
      .reduce((total, price) => total + price, 0);
  }
  
  console.log(getTotalPriceByCategory("Electronics"));
  
  