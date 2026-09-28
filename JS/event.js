const menuButton = document.querySelector(".menu-btn");
const sideMenu = document.querySelector(".side-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".menu-links a");

function openMenu() {
    document.body.classList.add("menu-open");
    sideMenu.setAttribute("aria-hidden", "false");
}

function closeMenu() {
    document.body.classList.remove("menu-open");
    sideMenu.setAttribute("aria-hidden", "true");
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


const eventForm = document.querySelector("#eventForm");

if (eventForm) {

    eventForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const eventName = document.querySelector("#eventName").value;
        const eventType = document.querySelector("#eventType").value;
        const eventDate = document.querySelector("#eventDate").value;
        const guestNumber = document.querySelector("#guestNumber").value;
        const eventMessage = document.querySelector("#eventMessage").value;

        const whatsappNumber = "2340000000000";

        const message =
            "Hello Ifybee's Cakes & Confectionery,%0A%0A" +
            "My name is " + encodeURIComponent(eventName) + ".%0A" +
            "I am planning a " + encodeURIComponent(eventType) + ".%0A" +
            "Event date: " + encodeURIComponent(eventDate) + ".%0A" +
            "Number of guests: " + encodeURIComponent(guestNumber) + ".%0A%0A" +
            "Event details:%0A" +
            encodeURIComponent(eventMessage);

        const whatsappLink =
            "https://wa.me/" + whatsappNumber + "?text=" + message;

        window.open(whatsappLink, "_blank");

    });
}