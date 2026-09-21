document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const navbar = document.querySelector(".navbar");

    const menuButton = document.querySelector(".menu-button");
    const closeMenuButton = document.querySelector(".close-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const sideMenu = document.querySelector(".side-menu");

    const menuLinks = document.querySelectorAll(".side-menu-links a");

    const slides = document.querySelectorAll(".hero-slide");
    const slideDots = document.querySelectorAll(".slide-dot");

    const revealItems = document.querySelectorAll(".reveal-item");


    /* =========================
       NAVBAR
    ========================= */

    function updateNavbar() {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =========================
       SIDE MENU
    ========================= */

    function openMenu() {

        if (!sideMenu) {
            return;
        }

        body.classList.add("menu-open");

        sideMenu.setAttribute("aria-hidden", "false");

        menuOverlay.setAttribute("aria-hidden", "false");

        menuButton.setAttribute("aria-expanded", "true");

        menuButton.setAttribute("aria-label", "Close navigation menu");
    }


    function closeMenu() {

        if (!sideMenu) {
            return;
        }

        body.classList.remove("menu-open");

        sideMenu.setAttribute("aria-hidden", "true");

        menuOverlay.setAttribute("aria-hidden", "true");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.setAttribute("aria-label", "Open navigation menu");
    }


    if (menuButton) {
        menuButton.addEventListener("click", () => {

            if (body.classList.contains("menu-open")) {
                closeMenu();
            } else {
                openMenu();
            }

        });
    }


    if (closeMenuButton) {
        closeMenuButton.addEventListener("click", closeMenu);
    }


    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }


    menuLinks.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =========================
       HERO SLIDESHOW
    ========================= */

    let currentSlide = 0;

    let slideTimer;


    function showSlide(index) {

        if (!slides.length) {
            return;
        }

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }


        slides.forEach((slide, slideIndex) => {

            slide.classList.toggle(
                "active",
                slideIndex === currentSlide
            );

        });


        slideDots.forEach((dot, dotIndex) => {

            const isActive = dotIndex === currentSlide;

            dot.classList.toggle("active", isActive);

            dot.setAttribute(
                "aria-current",
                isActive ? "true" : "false"
            );

        });

    }


    function nextSlide() {
        showSlide(currentSlide + 1);
    }


    function startSlideshow() {

        clearInterval(slideTimer);

        slideTimer = setInterval(() => {

            nextSlide();

        }, 5000);

    }


    slideDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            startSlideshow();

        });

    });


    showSlide(0);

    startSlideshow();


    /* =========================
       PAUSE SLIDESHOW WHEN
       TAB IS NOT ACTIVE
    ========================= */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            clearInterval(slideTimer);

        } else {

            startSlideshow();

        }

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(entry.target);

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

            item.classList.add("visible");

        });

    }


    /* =========================
       CART BUTTON
    ========================= */

    const cartButton = document.querySelector(".cart-button");

    if (cartButton) {

        cartButton.addEventListener("click", () => {

            alert(
                "Your shopping cart will be connected when the backend is added."
            );

        });

    }


    /* =========================
       KEYBOARD SLIDESHOW
    ========================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {

            nextSlide();

            startSlideshow();

        }

        if (event.key === "ArrowLeft") {

            showSlide(currentSlide - 1);

            startSlideshow();

        }

    });

});