"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-button");
    const closeMenuButton = document.querySelector(".close-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const sideMenu = document.querySelector(".side-menu");

    function openMenu() {
        document.body.classList.add("menu-open");

        menuButton?.setAttribute("aria-expanded", "true");
        sideMenu?.setAttribute("aria-hidden", "false");
    }

    function closeMenu() {
        document.body.classList.remove("menu-open");

        menuButton?.setAttribute("aria-expanded", "false");
        sideMenu?.setAttribute("aria-hidden", "true");
    }

    menuButton?.addEventListener("click", openMenu);
    closeMenuButton?.addEventListener("click", closeMenu);
    menuOverlay?.addEventListener("click", closeMenu);

    document.querySelectorAll(".side-menu a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);

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


    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 80}ms`;

    });



});