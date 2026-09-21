document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.querySelector(".menu-button");

    const closeMenu =
        document.querySelector(".close-menu");

    const menuOverlay =
        document.querySelector(".menu-overlay");

    const sideMenuLinks =
        document.querySelectorAll(".side-menu a");


    function openMenu() {

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMenuPanel() {

        document.body.classList.remove(
            "menu-open"
        );

    }


    menuButton?.addEventListener(
        "click",
        openMenu
    );


    closeMenu?.addEventListener(
        "click",
        closeMenuPanel
    );


    menuOverlay?.addEventListener(
        "click",
        closeMenuPanel
    );


    sideMenuLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenuPanel
        );

    });


    /* =====================================================
       PRODUCT FILTERING
    ===================================================== */

    const productCards =
        document.querySelectorAll(
            ".shop-product-card"
        );

    const filterButtons =
        document.querySelectorAll(
            ".filter-button"
        );

    const searchInput =
        document.querySelector(
            "#product-search"
        );

    const noResults =
        document.querySelector(
            "#no-results"
        );


    let selectedCategory = "all";


    function filterProducts() {

        const searchTerm =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        let visibleProducts = 0;


        productCards.forEach((card) => {

            const category =
                card.dataset.category || "";

            const name =
                (card.dataset.name || "")
                    .toLowerCase();


            const categoryMatches =
                selectedCategory === "all" ||
                category === selectedCategory;


            const searchMatches =
                name.includes(searchTerm);


            const shouldShow =
                categoryMatches &&
                searchMatches;


            if (shouldShow) {

                card.style.display = "";

                requestAnimationFrame(() => {

                    card.classList.add(
                        "visible"
                    );

                });

                visibleProducts++;

            } else {

                card.style.display = "none";

                card.classList.remove(
                    "visible"
                );

            }

        });


        if (noResults) {

            noResults.classList.toggle(
                "visible",
                visibleProducts === 0
            );

        }

    }


    filterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    (item) => {
                        item.classList.remove(
                            "active"
                        );
                    }
                );


                button.classList.add(
                    "active"
                );


                selectedCategory =
                    button.dataset.category ||
                    "all";


                filterProducts();

            }
        );

    });


    searchInput?.addEventListener(
        "input",
        filterProducts
    );


    /* =====================================================
       CART
    ===================================================== */

    const addCartButtons =
        document.querySelectorAll(
            ".add-cart"
        );

    const cartCount =
        document.querySelector(
            ".cart-count"
        );

    const notification =
        document.querySelector(
            "#cart-notification"
        );

    const notificationProduct =
        document.querySelector(
            "#notification-product"
        );


    let cartItems = 0;
    let notificationTimeout;


    addCartButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                cartItems++;


                if (cartCount) {

                    cartCount.textContent =
                        cartItems;

                }


                if (
                    notification &&
                    notificationProduct
                ) {

                    const product =
                        button.dataset.product ||
                        "Product";

                    notificationProduct.textContent =
                        `${product} was added to your cart.`;

                    notification.classList.add(
                        "show"
                    );


                    clearTimeout(
                        notificationTimeout
                    );


                    notificationTimeout =
                        setTimeout(() => {

                            notification.classList.remove(
                                "show"
                            );

                        }, 3000);

                }

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealItems =
        document.querySelectorAll(
            ".reveal-item"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealItems.forEach((item) => {

            revealObserver.observe(item);

        });

    } else {

        revealItems.forEach((item) => {

            item.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       QUICK VIEW
    ===================================================== */

    const quickViewButtons =
        document.querySelectorAll(
            ".quick-view"
        );


    quickViewButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".shop-product-card"
                    );


                if (!card) return;


                const productName =
                    card.dataset.name ||
                    "Product";


                alert(
                    `${productName}\n\nProduct details will be connected here later.`
                );

            }
        );

    });


    /* =====================================================
       INITIAL FILTER STATE
    ===================================================== */

    filterProducts();

});