/* =====================================================
   IFYBEE'S EVENTS PAGE
   JAVASCRIPT
===================================================== */


/* =====================================================
   SIDE MENU
===================================================== */

const menuButton =
    document.querySelector(".menu-button");

const closeMenuButton =
    document.querySelector(".close-menu");

const menuOverlay =
    document.querySelector(".menu-overlay");

const sideMenu =
    document.querySelector(".side-menu");

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


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealItems =
    document.querySelectorAll(".reveal-item");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
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


/* =====================================================
   HERO
   Make sure hero text appears immediately
   even if JavaScript loads slowly.
===================================================== */

const heroContent =
    document.querySelector(".events-hero-content");


if (heroContent) {

    setTimeout(() => {

        heroContent.classList.add("visible");

    }, 150);

}



/* =====================================================
   CINEMATIC PARALLAX
===================================================== */

const statementSection =
    document.querySelector(".event-statement");

const statementImage =
    document.querySelector(".statement-image img");


window.addEventListener("scroll", () => {

    if (!statementSection || !statementImage) {
        return;
    }


    const rect =
        statementSection.getBoundingClientRect();


    const windowHeight =
        window.innerHeight;


    if (
        rect.top < windowHeight &&
        rect.bottom > 0
    ) {

        const progress =
            (windowHeight - rect.top) /
            (windowHeight + rect.height);


        const movement =
            (progress - 0.5) * 35;


        statementImage.style.transform =
            `scale(1.08) translateY(${movement}px)`;

    }

});



/* =====================================================
   PREVENT EMPTY LINKS FROM JUMPING TO TOP
===================================================== */

const emptyLinks =
    document.querySelectorAll('a[href="#"]');


emptyLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

    });

});