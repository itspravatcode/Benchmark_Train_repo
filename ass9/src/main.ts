interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}

const API_URL = "https://fakestoreapi.com/products";
let allProducts: Product[] = [];

async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch(API_URL);
        allProducts = await response.json();
        return allProducts;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}


let currentFilters = {
    minPrice: null as number | null,
    maxPrice: null as number | null,
    category: null as string | null,
    sortOrder: null as string | null,
    searchQuery: ""
};

document.addEventListener("DOMContentLoaded", async () => {
    const products = await fetchProducts();
    renderFilters(products);
    renderSearchBar();
    renderProducts(products);
});



function renderFilters(products: Product[]) {
    renderPriceFilters(products);
    renderCategoryFilters(products);
    renderSortOptions();
}

function renderSearchBar() {
    const navbar = document.querySelector(".navbar .container");
    const searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.id = "searchBox";
    searchBox.className = "form-control ms-3";
    searchBox.placeholder = "Search products...";
    searchBox.style.width = "250px";
    searchBox.addEventListener("input", (event) => {
        currentFilters.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
        applyFilters();
    });
    navbar?.appendChild(searchBox);
}

function renderPriceFilters(products: Product[]) {
    const priceFiltersContainer = document.getElementById("priceFilters")!;
    const maxPrice = Math.max(...products.map(p => p.price));
    const minPrice = Math.min(...products.map(p => p.price));

    priceFiltersContainer.innerHTML = `
        <label for="minPrice" class="form-label">Min Price: <span id="minPriceValue">$${minPrice}</span></label>
        <input type="range" id="minPrice" class="form-range" min="${minPrice}" max="${maxPrice}" step="1" value="${minPrice}">

        <label for="maxPrice" class="form-label">Max Price: <span id="maxPriceValue">$${maxPrice}</span></label>
        <input type="range" id="maxPrice" class="form-range" min="${minPrice}" max="${maxPrice}" step="1" value="${maxPrice}">

        <button id="clearPriceFilter" class="btn btn-sm btn-warning mt-2">Clear Price Filter</button>
    `;

    const minPriceInput = document.getElementById("minPrice") as HTMLInputElement;
    const maxPriceInput = document.getElementById("maxPrice") as HTMLInputElement;
    const minPriceValue = document.getElementById("minPriceValue")!;
    const maxPriceValue = document.getElementById("maxPriceValue")!;


    minPriceInput.addEventListener("input", () => {
        if (parseFloat(minPriceInput.value) > parseFloat(maxPriceInput.value)) {
            minPriceInput.value = maxPriceInput.value;
        }
        currentFilters.minPrice = parseFloat(minPriceInput.value);
        minPriceValue.textContent = `$${minPriceInput.value}`;
        applyFilters();
    });

    maxPriceInput.addEventListener("input", () => {
        if (parseFloat(maxPriceInput.value) < parseFloat(minPriceInput.value)) {
            maxPriceInput.value = minPriceInput.value;
        }
        currentFilters.maxPrice = parseFloat(maxPriceInput.value);
        maxPriceValue.textContent = `$${maxPriceInput.value}`;
        applyFilters();
    });

    document.getElementById("clearPriceFilter")!.addEventListener("click", () => {
        minPriceInput.value = minPrice.toString();
        maxPriceInput.value = maxPrice.toString();
        minPriceValue.textContent = `$${minPrice}`;
        maxPriceValue.textContent = `$${maxPrice}`;
        currentFilters.minPrice = null;
        currentFilters.maxPrice = null;
        applyFilters();
    });
}



function renderCategoryFilters(products: Product[]) {
    const categories = [...new Set(products.map(p => p.category))];
    const categoryFiltersContainer = document.createElement("div");
    categoryFiltersContainer.innerHTML = '<h5>Filter by Category</h5>';
    
    categories.forEach(category => {
        categoryFiltersContainer.innerHTML += `<div>
            <input type="radio" name="categoryFilter" value="${category}" id="category-${category}">
            <label for="category-${category}">${category}</label>
        </div>`;
    });
    
    categoryFiltersContainer.innerHTML += '<button id="clearCategoryFilter" class="btn btn-sm btn-warning mt-2">Clear Category Filter</button>';
    document.querySelector(".filter-section")!.appendChild(categoryFiltersContainer);

    document.querySelectorAll<HTMLInputElement>('input[name="categoryFilter"]').forEach(input => {
        input.addEventListener("change", (event) => {
            currentFilters.category = (event.target as HTMLInputElement).value;
            applyFilters();
        });
    });
    
    document.getElementById("clearCategoryFilter")!.addEventListener("click", () => {
        document.querySelectorAll<HTMLInputElement>('input[name="categoryFilter"]').forEach(input => input.checked = false);
        currentFilters.category = null;
        applyFilters();
    });
}

function applyFilters() {
    let filtered = allProducts; 

    if (currentFilters.minPrice !== null) {
        filtered = filtered.filter(p => p.price >= currentFilters.minPrice!);
    }
    if (currentFilters.maxPrice !== null) {
        filtered = filtered.filter(p => p.price <= currentFilters.maxPrice!);
    }

    if (currentFilters.category) {
        filtered = filtered.filter(p => p.category === currentFilters.category);
    }

    if (currentFilters.searchQuery) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(currentFilters.searchQuery));
    }

    if (currentFilters.sortOrder === "asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentFilters.sortOrder === "desc") {
        filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
}




function renderProducts(products: Product[]) {
  const container = document.getElementById("productsContainer")!;
  container.innerHTML = "";

  if (products.length === 0) {
      container.innerHTML = '<p style="color: #ff9800; font-weight: bold;">No products available</p>';
      return;
  }

  products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="img-fluid">
          <h6>${product.title}</h6>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="btn btn-warning add-to-cart" 
              data-id="${product.id}" 
              data-title="${product.title}" 
              data-price="${product.price}" 
              data-image="${product.image}">
              Add to Cart
          </button>
      `;
      container.appendChild(productCard);
  });


}
function renderSortOptions() {
    const sortContainer = document.createElement("div");
    sortContainer.innerHTML = `
        <h5>Sort by Price</h5>
        <select id="sortPrice" class="form-select">
            <option value="">Select</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
        </select>
        <button id="clearSortFilter" class="btn btn-sm btn-warning mt-2">Clear Sort</button>`;
    
    document.querySelector(".filter-section")!.appendChild(sortContainer);

    document.getElementById("sortPrice")!.addEventListener("change", (event) => {
        currentFilters.sortOrder = (event.target as HTMLSelectElement).value;
        applyFilters();
    });

    document.getElementById("clearSortFilter")!.addEventListener("click", () => {
        (document.getElementById("sortPrice") as HTMLSelectElement).value = "";
        currentFilters.sortOrder = null;
        applyFilters();
    });
}



