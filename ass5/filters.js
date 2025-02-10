const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const priceFilterBtn = document.getElementById("price-filter-btn");

priceFilterBtn.addEventListener("click", async () => {
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  const products = await fetchProducts();
  const filteredProducts = products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  contentDiv.innerHTML = filteredProducts.length
    ? `<h2 class="text-center my-4">Products in Price Range: $${minPrice.toFixed(
        2
      )} - $${maxPrice.toFixed(2)}</h2>`
    : `<p class="text-center text-danger">No products found in the selected price range.</p>`;

  displayProductsByCategory(filteredProducts);
});
