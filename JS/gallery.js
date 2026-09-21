document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-button");
    const closeMenu = document.querySelector(".close-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const sideMenu = document.querySelector(".side-menu");

    function openMenu() {
        document.body.classList.add("menu-open");

        menuButton?.setAttribute("aria-expanded", "true");
        sideMenu?.setAttribute("aria-hidden", "false");
    }

    function closeMenuPanel() {
        document.body.classList.remove("menu-open");

        menuButton?.setAttribute("aria-expanded", "false");
        sideMenu?.setAttribute("aria-hidden", "true");
    }

    menuButton?.addEventListener("click", openMenu);

    closeMenu?.addEventListener("click", closeMenuPanel);

    menuOverlay?.addEventListener("click", closeMenuPanel);

    document.querySelectorAll(".side-menu a").forEach((link) => {
        link.addEventListener("click", closeMenuPanel);
    });


    const filterButtons =
        document.querySelectorAll(".filter-button");

    const galleryItems =
        Array.from(document.querySelectorAll(".gallery-item"));

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            filterButtons.forEach((item) => {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            const filter = button.dataset.filter;

            galleryItems.forEach((item) => {

                const matches =
                    filter === "all" ||
                    item.dataset.category === filter;

                item.classList.toggle("hidden", !matches);

            });

        });

    });


    filterButtons.forEach((button) => {

        button.setAttribute(
            "aria-pressed",
            button.classList.contains("active")
                ? "true"
                : "false"
        );

    });


    const lightbox =
        document.querySelector("#lightbox");

    const lightboxImage =
        document.querySelector("#lightboxImage");

    const lightboxCategory =
        document.querySelector("#lightboxCategory");

    const lightboxTitle =
        document.querySelector("#lightboxTitle");

    const closeButton =
        document.querySelector(".lightbox-close");

    const previousButton =
        document.querySelector(".lightbox-prev");

    const nextButton =
        document.querySelector(".lightbox-next");

    const viewButtons =
        document.querySelectorAll(".gallery-view");

    let currentIndex = 0;


    function getVisibleItems() {

        return galleryItems.filter(
            (item) =>
                !item.classList.contains("hidden")
        );

    }


    function showImage(index) {

        const items = getVisibleItems();

        if (!items.length) {
            return;
        }

        currentIndex =
            (index + items.length) % items.length;

        const item = items[currentIndex];

        const image =
            item.querySelector("img");

        const category =
            item.querySelector(".gallery-overlay p");

        const title =
            item.querySelector(".gallery-overlay h3");

        if (!image) {
            return;
        }

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightboxCategory.textContent =
            category
                ? category.textContent.trim()
                : "";

        lightboxTitle.textContent =
            title
                ? title.textContent.trim()
                : "";

    }


    function openLightbox(item) {

        const items = getVisibleItems();

        const index = items.indexOf(item);

        if (index === -1) {
            return;
        }

        showImage(index);

        lightbox.classList.add("open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "lightbox-open"
        );

        closeButton?.focus();

    }


    function closeLightbox() {

        lightbox.classList.remove("open");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "lightbox-open"
        );

    }


    viewButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const item =
                button.closest(".gallery-item");

            if (item) {
                openLightbox(item);
            }

        });

    });


    closeButton?.addEventListener(
        "click",
        closeLightbox
    );


    lightbox?.addEventListener(
        "click",
        (event) => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        }
    );


    previousButton?.addEventListener(
        "click",
        () => {
            showImage(currentIndex - 1);
        }
    );


    nextButton?.addEventListener(
        "click",
        () => {
            showImage(currentIndex + 1);
        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                document.body.classList.contains("menu-open")
            ) {
                closeMenuPanel();
                return;
            }

            if (
                !lightbox?.classList.contains("open")
            ) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowLeft") {
                showImage(currentIndex - 1);
            }

            if (event.key === "ArrowRight") {
                showImage(currentIndex + 1);
            }

        }
    );


    const revealItems =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, instance) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            instance.unobserve(
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
            observer.observe(item);
        });

    } else {

        revealItems.forEach((item) => {
            item.classList.add("visible");
        });

    }


    const sparkleContainer =
        document.querySelector("#heroSparkles");

    if (sparkleContainer) {

        for (let i = 0; i < 18; i++) {

            const sparkle =
                document.createElement("span");

            sparkle.className = "sparkle";

            sparkle.style.left =
                `${Math.random() * 100}%`;

            sparkle.style.top =
                `${Math.random() * 100}%`;

            sparkle.style.animationDelay =
                `${Math.random() * 4}s`;

            sparkleContainer.appendChild(
                sparkle
            );

        }

    }


    const ctaSparkles =
        document.querySelector(".cta-sparkles");

    if (ctaSparkles) {

        for (let i = 0; i < 12; i++) {

            const sparkle =
                document.createElement("span");

            sparkle.className = "sparkle";

            sparkle.style.left =
                `${Math.random() * 100}%`;

            sparkle.style.top =
                `${Math.random() * 100}%`;

            sparkle.style.animationDelay =
                `${Math.random() * 4}s`;

            ctaSparkles.appendChild(
                sparkle
            );

        }

    }

});