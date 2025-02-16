interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
const cartCountElement = document.getElementById("cart-count")!;

updateCartCount();

function renderProducts(products: Product[]) {
    const container = document.getElementById("productsContainer")!;
    container.innerHTML = "";
    
    if (products.length === 0) {
        container.innerHTML = '<p style="color: #ff9800; font-weight: bold;">No products available</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="img-fluid" style="max-height: 150px;">
            <h6>${product.title}</h6>
            <p>$${product.price.toFixed(2)}</p>
            <button class="btn btn-warning add-to-cart" 
                data-id="${product.id}" 
                data-title="${product.title}" 
                data-price="${product.price}">
                Add to Cart
            </button>
        `;
        container.appendChild(productCard);
    });

    attachAddToCartEvent();
}



function attachAddToCartEvent() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const button = event.target as HTMLButtonElement;
            const productId = parseInt(button.getAttribute("data-id")!);
            const productTitle = button.getAttribute("data-title")!;
            const productPrice = parseFloat(button.getAttribute("data-price")!);
            const productImage = (button.closest(".product-card")!.querySelector("img") as HTMLImageElement).src;

            showQuantityPopup({ id: productId, title: productTitle, price: productPrice, image: productImage });
        });
    });
}

function showQuantityPopup(product: { id: number; title: string; price: number; image: string }) {
    const quantity = prompt(`Enter quantity for ${product.title}:`, "1");
    if (quantity !== null && !isNaN(parseInt(quantity)) && parseInt(quantity) > 0) {
        addToCart({ ...product, quantity: parseInt(quantity) });
    }
}

// function addToCart(product: { id: number; title: string; price: number; image: string; quantity: number }) {
//     let cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");

//     const existingItem = cart.find(item => item.id === product.id);
//     if (existingItem) {
//         existingItem.quantity += product.quantity;
//     } else {
//         cart.push(product);
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCartCount();
// }

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// function updateCartCount() {
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     cartCountElement.textContent = totalItems > 0 ? `(${totalItems})` : "(0)";
// }
function addToCart(product: { id: number; title: string; price: number; image: string; quantity: number }) {
    let cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // ✅ Update count instantly
}

function updateCartCount() {
    let cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count")!.textContent = `(${totalItems})`;
}
