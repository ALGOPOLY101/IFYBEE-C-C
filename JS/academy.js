"use strict";


/* ==================== MENU ==================== */

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

    menuButton?.setAttribute(
        "aria-expanded",
        "true"
    );

    sideMenu?.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeMenu() {

    document.body.classList.remove(
        "menu-open"
    );

    menuButton?.setAttribute(
        "aria-expanded",
        "false"
    );

    sideMenu?.setAttribute(
        "aria-hidden",
        "true"
    );

}


menuButton?.addEventListener(
    "click",
    openMenu
);


closeMenuButton?.addEventListener(
    "click",
    closeMenu
);


menuOverlay?.addEventListener(
    "click",
    closeMenu
);


document
    .querySelectorAll(
        ".side-menu a"
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            document.body.classList.contains(
                "menu-open"
            )
        ) {

            closeMenu();

        }

    }
);



/* ==================== SCROLL REVEAL ==================== */

const revealItems =
    document.querySelectorAll(
        ".reveal-item"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealItems.forEach(
        (item) => {

            revealObserver.observe(item);

        }
    );

} else {

    revealItems.forEach(
        (item) => {

            item.classList.add(
                "visible"
            );

        }
    );

}



/* ==================== FAQ ==================== */

const faqItems =
    document.querySelectorAll(
        ".faq-list details"
    );


faqItems.forEach(
    (item) => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open) {
                    return;
                }


                faqItems.forEach(
                    (otherItem) => {

                        if (
                            otherItem !== item
                        ) {

                            otherItem.open =
                                false;

                        }

                    }
                );

            }
        );

    }
);



/* ==================== VIDEO PLACEHOLDER ==================== */

const playButton =
    document.querySelector(
        ".play-button"
    );

const video =
    document.querySelector(
        ".video-inner video"
    );

const videoOverlay =
    document.querySelector(
        ".video-overlay"
    );


playButton?.addEventListener(
    "click",
    () => {

        if (!video) {
            return;
        }


        if (
            video.querySelector("source")?.src
        ) {

            video.play();

        }

    }
);


video?.addEventListener(
    "play",
    () => {

        if (videoOverlay) {

            videoOverlay.style.opacity =
                "0";

            videoOverlay.style.pointerEvents =
                "none";

        }

    }
);



/* ==================== CART PLACEHOLDER ==================== */

const cartButton =
    document.querySelector(
        ".cart-button"
    );


cartButton?.addEventListener(
    "click",
    () => {

        console.log(
            "Cart functionality will be connected later."
        );

    }
);