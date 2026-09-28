const slides = document.querySelectorAll(".slide");
const slideButtons = document.querySelectorAll(".slide-line");

let currentSlide = 0;

function showSlide(number) {

    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    slideButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    slides[number].classList.add("active");
    slideButtons[number].classList.add("active");

    currentSlide = number;
}

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

slideButtons.forEach(function (button, index) {

    button.addEventListener("click", function () {
        showSlide(index);
    });

});

setInterval(nextSlide, 6000);


/* MENU */

const menu = document.querySelector(".menu");
const menuButton = document.querySelector(".menu-btn");
const menuOverlay = document.querySelector(".menu-overlay");

menuButton.addEventListener("click", function () {
    document.body.classList.toggle("menu-open");
});

menuOverlay.addEventListener("click", function () {
    document.body.classList.remove("menu-open");
});

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
    });

});