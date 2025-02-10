if (!localStorage.getItem("authToken")) {
  window.location.href = "login.html";
}



const cartContentDiv = document.getElementById("content");
const cartButton = document.getElementById("cart-button");

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function addToCart(product) {
  const cart = getCartItems();
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to cart!`);
}

function displayCart() {
  const cart = getCartItems();
  cartContentDiv.innerHTML = "";

  if (cart.length === 0) {
    cartContentDiv.innerHTML = `<p class="text-center text-danger">Your cart is empty!</p>`;
    return;
  }

  const cartSection = document.createElement("div");
  cartSection.className = "mb-5";

  const cartHeading = document.createElement("h2");
  cartHeading.textContent = "Your Cart";
  cartHeading.className = "text-center my-4";
  cartSection.appendChild(cartHeading);

  const cartRow = document.createElement("div");
  cartRow.className = "row";

  let total = 0;

  cart.forEach((product) => {
    total += product.price;
    const productCard = document.createElement("div");
    productCard.className = "col-lg-3 col-md-4 col-sm-6 col-12 d-flex mb-3";

    productCard.innerHTML = `
      <div class="card w-100">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text text-success fw-bold">$${product.price.toFixed(2)}</p>
        </div>
      </div>
    `;
    cartRow.appendChild(productCard);
  });

  cartSection.appendChild(cartRow);

  const totalDiv = document.createElement("div");
  totalDiv.className = "text-center my-4";
  totalDiv.innerHTML = `<h4>Total: $${total.toFixed(2)}</h4>`;
  cartSection.appendChild(totalDiv);

  const checkoutButton = document.createElement("button");
  checkoutButton.textContent = "Checkout";
  checkoutButton.className = "btn btn-success btn-lg d-block mx-auto";
  checkoutButton.addEventListener("click", () => {
    localStorage.removeItem("cart");
    alert("Thank you for your purchase!");
    displayCart();
  });

  cartSection.appendChild(checkoutButton);
  cartContentDiv.appendChild(cartSection);
}

if (cartButton) {
  cartButton.addEventListener("click", displayCart);
} else {
  console.error("Cart button not found in the DOM.");
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const productId = event.target.dataset.id;
    fetchProducts().then((products) => {
      const product = products.find((p) => p.id === parseInt(productId));
      if (product) {
        addToCart(product);
      }
    });
  }
});
