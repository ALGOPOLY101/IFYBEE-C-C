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


const academyForm = document.querySelector("#academyForm");

if (academyForm) {

    academyForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const studentName = document.querySelector("#studentName").value;
        const classInterest = document.querySelector("#classInterest").value;
        const academyMessage = document.querySelector("#academyMessage").value;

        const whatsappNumber = "2340000000000";

        const message =
            "Hello Ifybee's Academy,%0A%0A" +
            "My name is " + encodeURIComponent(studentName) + ".%0A" +
            "I am interested in: " + encodeURIComponent(classInterest) + ".%0A%0A" +
            "Message: " + encodeURIComponent(academyMessage);

        const whatsappLink =
            "https://wa.me/" + whatsappNumber + "?text=" + message;

        window.open(whatsappLink, "_blank");

    });
}


const faqItems = document.querySelectorAll(".faq-list details");

faqItems.forEach(function (item) {

    item.addEventListener("toggle", function () {

        if (item.open) {

            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {
                    otherItem.removeAttribute("open");
                }

            });

        }

    });

});