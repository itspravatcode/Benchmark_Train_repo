const products = [
    { name: "Laptop", price: 800, category: "Electronics" },
    { name: "Chair", price: 120, category: "Furniture" },
    { name: "Headphones", price: 150, category: "Electronics" },
    { name: "Table", price: 200, category: "Furniture" }
  ];
  
  const electronics = products.filter(product => product.category === "Electronics");
  console.log(electronics);
  