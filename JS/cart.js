let cart = JSON.parse(localStorage.getItem("ifybeeCart")) || [];

const cartButton = document.querySelector(".cart-btn");
const cartClose = document.querySelector(".cart-close");
const cartOverlay = document.querySelector(".cart-overlay");

function saveCart() {

    localStorage.setItem(
        "ifybeeCart",
        JSON.stringify(cart)
    );

}


function updateCart() {

    const count = document.querySelector(".cart-count");
    const items = document.querySelector(".cart-items");
    const total = document.querySelector(".cart-total-price");

    if (!count || !items || !total) {
        return;
    }


    let itemCount = 0;
    let totalPrice = 0;


    items.innerHTML = "";


    if (cart.length === 0) {

        items.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        count.textContent = "0";
        total.textContent = "₦0";

        return;
    }


    cart.forEach(function (item, index) {

        itemCount += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        items.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}">


                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₦${item.price.toLocaleString()}
                    </p>


                    <div class="cart-item-buttons">

                        <button
                            onclick="changeQuantity(${index}, -1)">
                            -
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>


                        <button
                            class="remove-item"
                            onclick="removeItem(${index})">

                            Remove

                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    count.textContent = itemCount;

    total.textContent =
        "₦" + totalPrice.toLocaleString();

}


function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

}


function openCart() {

    document.body.classList.add("cart-open");

}


function closeCart() {

    document.body.classList.remove("cart-open");

}


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (cartClose) {

    cartClose.addEventListener(
        "click",
        closeCart
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCart
    );

}


updateCart();