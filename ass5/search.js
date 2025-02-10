const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", async () => {
  const query = searchBar.value.toLowerCase();
  const products = await fetchProducts();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  
  if (filteredProducts.length > 0) {
    displayProductsByCategory(filteredProducts);
  } else {
    contentDiv.innerHTML = `<p class="text-center text-danger">No products found matching "${query}".</p>`;
  }
});
