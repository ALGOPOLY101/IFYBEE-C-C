const menuButton = document.querySelector(".menu-btn");
const sideMenu = document.querySelector(".side-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".menu-links a");

function openMenu() {
    document.body.classList.add("menu-open");

    if (sideMenu) {
        sideMenu.setAttribute("aria-hidden", "false");
    }
}

function closeMenu() {
    document.body.classList.remove("menu-open");

    if (sideMenu) {
        sideMenu.setAttribute("aria-hidden", "true");
    }
}

if (menuButton) {
    menuButton.addEventListener("click", openMenu);
}

if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
}

menuLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
});


const galleryImages = document.querySelectorAll(".gallery-card img");

galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

        const imageSource = image.getAttribute("src");

        window.open(imageSource, "_blank");

    });

});