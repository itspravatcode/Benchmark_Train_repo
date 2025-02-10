const contentDiv = document.getElementById("content");

async function displayAllProducts() {
  const products = await fetchProducts();
  displayProductsByCategory(products);
}

function displayProductsByCategory(products) {
  contentDiv.innerHTML = "";

  const categories = [...new Set(products.map((product) => product.category))];

  categories.forEach((category) => {
    const categorySection = document.createElement("div");
    categorySection.className = "category-section mb-5";

    const categoryHeading = document.createElement("h3");
    categoryHeading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryHeading.className = "mb-3 text-primary";
    categorySection.appendChild(categoryHeading);

    const categoryRow = document.createElement("div");
    categoryRow.className = "row";

    const categoryProducts = products.filter((product) => product.category === category);
    categoryProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "col-lg-3 col-md-4 col-sm-6 col-12 d-flex mb-3";

      productCard.innerHTML = `
        <div class="card w-100">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text text-success fw-bold">$${product.price}</p>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `;
      categoryRow.appendChild(productCard);
    });

    categorySection.appendChild(categoryRow);
    contentDiv.appendChild(categorySection);
  });
}

displayAllProducts();
