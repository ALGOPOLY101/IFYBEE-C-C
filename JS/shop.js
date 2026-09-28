const menu = document.querySelector(".menu");
const menuButton = document.querySelector(".menu-btn");
const menuOverlay = document.querySelector(".menu-overlay");

menuButton.addEventListener("click", function () {
    document.body.classList.toggle("menu-open");
});

menuOverlay.addEventListener("click", function () {
    document.body.classList.remove("menu-open");
});


const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
    });

});


/* PRODUCT SEARCH AND FILTER */

const products = document.querySelectorAll(".card");
const filters = document.querySelectorAll(".filter");
const search = document.querySelector("#product-search");
const noResults = document.querySelector("#no-results");

let selectedCategory = "all";

function filterProducts() {

    const searchText = search.value.toLowerCase().trim();

    let found = 0;

    products.forEach(function (product) {

        const category = product.dataset.category;
        const name = product.dataset.name.toLowerCase();

        const correctCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const correctSearch =
            name.includes(searchText);

        if (correctCategory && correctSearch) {

            product.style.display = "block";
            found++;

        } else {

            product.style.display = "none";

        }

    });


    if (found === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }

}


filters.forEach(function (filter) {

    filter.addEventListener("click", function () {

        filters.forEach(function (button) {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        selectedCategory = filter.dataset.category;

        filterProducts();

    });

});


search.addEventListener("input", filterProducts);


/* ADD TO CART */

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const product = {
            name: button.dataset.name,
            price: Number(button.dataset.price),
            image: button.dataset.image,
            quantity: 1
        };


        let cart =
            JSON.parse(localStorage.getItem("ifybeeCart")) || [];


        const existingProduct = cart.find(function (item) {

            return item.name === product.name;

        });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push(product);

        }


        localStorage.setItem(
            "ifybeeCart",
            JSON.stringify(cart)
        );


        updateCart();

        button.innerHTML =
            'Added <i class="fa-solid fa-check"></i>';


        setTimeout(function () {

            button.innerHTML =
                'Add to Cart <i class="fa-solid fa-plus"></i>';

        }, 1200);

    });

});