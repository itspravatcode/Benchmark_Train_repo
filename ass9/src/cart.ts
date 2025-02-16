if (!localStorage.getItem("authToken")) {
    window.location.href = "login.html";
  }
  

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}


let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
const cartContainer = document.getElementById("cartContainer")!;
const totalPriceElement = document.getElementById("totalPrice")!;
const cartCountElement = document.getElementById("cart-count")!;

updateCart();
renderCart();



function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = total.toFixed(2);
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems > 0 ? `(${totalItems})` : "(0)";
}

document.getElementById("checkoutBtn")!.addEventListener("click", () => {
    alert("Proceeding to checkout!");
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
    updateCart();
});
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});

function renderCart() {
    const cartContainer = document.getElementById("cartContainer")!;
    let cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");

    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="color: #ff9800; font-weight: bold;">Your cart is empty</p>';
    } else {
        cartContainer.innerHTML = '<div class="d-flex flex-wrap justify-content-center">';

        cart.forEach((item) => {
            total += item.price * item.quantity;

            cartContainer.innerHTML += `
                <div class="product-card">
                    <img src="${item.image}" alt="${item.title}" class="img-fluid">
                    <h6>${item.title}</h6>
                    <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                    <p><strong>Subtotal:</strong> $${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="btn btn-danger remove-from-cart" data-id="${item.id}">Remove from Cart</button>
                </div>
            `;
        });

        cartContainer.innerHTML += `</div>`;
    }

    const footer = document.getElementById("cartFooter")!;
    footer.innerHTML = `
        <h4>Total: $${total.toFixed(2)}</h4>
        <button id="checkoutBtn" class="btn btn-success">Checkout</button>
    `;

    attachRemoveEvent();
    attachCheckoutEvent();
}


function attachRemoveEvent() {
    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const button = event.target as HTMLButtonElement;
            const productId = parseInt(button.getAttribute("data-id")!, 10);
            removeFromCart(productId);
        });
    });
}

function removeFromCart(productId: number) {
    let cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemToRemove = cart.find(item => item.id === productId);
    
    if (itemToRemove) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount(); 
        renderCart();
    }
}
function updateCartCount() {
    let cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count")!.textContent = totalItems > 0 ? `(${totalItems})` : "(0)";
}


function attachCheckoutEvent() {
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            updateCartCount();
            renderCart();
            alert("🎉 Thank you for your purchase! Your order has been placed.");
        });
    }
}


document.addEventListener("DOMContentLoaded", () => {
    updateCartCount(); 
    renderCart();
});

