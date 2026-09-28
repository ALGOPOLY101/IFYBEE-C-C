const menuButton = document.querySelector(".menu-btn");
const sideMenu = document.querySelector(".side-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".menu-links a");

function openMenu() {

    document.body.classList.add("menu-open");

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", "true");
    }

    if (sideMenu) {
        sideMenu.setAttribute("aria-hidden", "false");
    }

}

function closeMenu() {

    document.body.classList.remove("menu-open");

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
    }

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


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeMenu();
    }

});