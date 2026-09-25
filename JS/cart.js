const storageKey = "ifybees-cart";
let cart = readCart();

function readCart() {
    try {
        const savedCart = JSON.parse(localStorage.getItem(storageKey) || "[]");
        return Array.isArray(savedCart) ? savedCart : [];
    } catch (error) {
        return [];
    }
}

function saveCart() {
    localStorage.setItem(storageKey, JSON.stringify(cart));
}

function formatPrice(price) {
    return `₦${Number(price || 0).toLocaleString("en-NG")}`;
}

function updateCartCount() {
    let count = 0;
    cart.forEach((item) => {
        count += item.quantity;
    });

    document.querySelectorAll(".cart-count").forEach((element) => {
        element.textContent = count;
        element.hidden = count === 0;
    });
}

function renderCart() {
    const cartList = document.querySelector("#cart-list");
    const totalElement = document.querySelector("#cart-total");
    let total = 0;

    updateCartCount();

    if (!cartList) return;

    if (!cart.length) {
        cartList.innerHTML = "<p class=\"cart-empty\">Your cart is waiting for something sweet.</p>";
    } else {
        cartList.innerHTML = "";

        cart.forEach((item) => {
            total += item.price * item.quantity;

            const cartItem = document.createElement("article");
            cartItem.className = "cart-item";
            cartItem.dataset.id = item.id;
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <strong>${formatPrice(item.price)}</strong>
                    <div class="cart-item-controls">
                        <button type="button" data-cart-action="decrease" aria-label="Decrease quantity">-</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-cart-action="increase" aria-label="Increase quantity">+</button>
                        <button class="cart-remove" type="button" data-cart-action="remove">Remove</button>
                    </div>
                </div>
                <strong class="cart-item-total">${formatPrice(item.price * item.quantity)}</strong>
            `;
            cartList.appendChild(cartItem);
        });
    }

    if (totalElement) totalElement.textContent = formatPrice(total);
}

function openCart() {
    const cartPanel = document.querySelector("#cart");
    document.body.classList.add("cart-open");
    if (cartPanel) cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
    const cartPanel = document.querySelector("#cart");
    document.body.classList.remove("cart-open");
    if (cartPanel) cartPanel.setAttribute("aria-hidden", "true");
}

function addToCart(button) {
    const card = button.closest(".shop-product-card, .product-card");
    if (!card) return;

    const name = button.dataset.product || card.dataset.name || card.querySelector("h3").textContent.trim();
    const priceSource = button.dataset.price || card.querySelector("[data-price], .product-bottom strong, .product-price").textContent;
    const price = Number(priceSource.replace(/[^\d]/g, "")) || 0;
    const image = card.querySelector("img").getAttribute("src");
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    saveCart();
    renderCart();
    openCart();
}

function updateCartItem(id, action) {
    const item = cart.find((cartItem) => cartItem.id === id);
    if (!item) return;

    if (action === "increase") item.quantity += 1;
    if (action === "decrease") item.quantity -= 1;
    if (action === "remove" || item.quantity < 1) {
        cart = cart.filter((cartItem) => cartItem.id !== id);
    }

    saveCart();
    renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();

    document.addEventListener("click", (event) => {
        const cartButton = event.target.closest(".cart-button");
        const addButton = event.target.closest(".add-cart");
        const closeButton = event.target.closest("#close-cart, #cart-overlay");
        const actionButton = event.target.closest("[data-cart-action]");

        if (cartButton) openCart();
        if (addButton) addToCart(addButton);
        if (closeButton) closeCart();
        if (actionButton) updateCartItem(actionButton.closest(".cart-item").dataset.id, actionButton.dataset.cartAction);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeCart();
    });
});
