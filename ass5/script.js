
if (!localStorage.getItem("authToken")) {
  window.location.href = "login.html";
}

const contentDiv = document.getElementById("content");
const searchBar = document.getElementById("search-bar");

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function displayProductsByCategory(products) {
  const categories = [...new Set(products.map((product) => product.category))];
  contentDiv.innerHTML = "";

  categories.forEach((category) => {
    const categorySection = document.createElement("div");
    categorySection.className = "mb-5";
    categorySection.innerHTML = `<h2 class="text-center my-4">${category}</h2>`;

    const categoryRow = document.createElement("div");
    categoryRow.className = "row";

    products
      .filter((product) => product.category === category)
      .forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "col-lg-3 col-md-4 col-sm-6 col-12 d-flex mb-4";
        productCard.innerHTML = `
          <div class="card w-100">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text text-success fw-bold">$${product.price.toFixed(2)}</p>
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

searchBar.addEventListener("input", async () => {
  const query = searchBar.value.toLowerCase();
  const products = await fetchProducts();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  displayProductsByCategory(filteredProducts);
});

async function initializeProducts() {
  const products = await fetchProducts();
  displayProductsByCategory(products);
}

initializeProducts();


