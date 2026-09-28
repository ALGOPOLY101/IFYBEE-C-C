const menuButton = document.querySelector(".menu-btn");
const sideMenu = document.querySelector(".side-menu");
const menuOverlay = document.querySelector(".menu-overlay");

menuButton.addEventListener("click", function () {
    sideMenu.classList.toggle("active");
    menuOverlay.classList.toggle("active");
});


menuOverlay.addEventListener("click", function () {
    sideMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
});


const inspirationInput = document.querySelector("#inspiration");
const imagePreview = document.querySelector("#imagePreview");

inspirationInput.addEventListener("change", function () {

    const file = inspirationInput.files[0];

    imagePreview.innerHTML = "";

    if (!file) {
        imagePreview.classList.remove("active");
        return;
    }

    const image = document.createElement("img");

    image.src = URL.createObjectURL(file);

    image.alt = "Selected cake inspiration";

    imagePreview.appendChild(image);

    imagePreview.classList.add("active");
});


const customCakeForm = document.querySelector("#customCakeForm");
const formSuccess = document.querySelector("#formSuccess");
const whatsappLink = document.querySelector("#whatsappLink");
const editEnquiry = document.querySelector("#editEnquiry");

customCakeForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    const email = document.querySelector("#email").value;
    const occasion = document.querySelector("#occasion").value;
    const cakeType = document.querySelector("#cakeType").value;
    const size = document.querySelector("#size").value;
    const date = document.querySelector("#date").value;
    const budget = document.querySelector("#budget").value;
    const message = document.querySelector("#message").value;

    const enquiry =
        "Hello Ifybee's Cakes & Confectionery,%0A%0A" +
        "I would like to make a custom cake enquiry.%0A%0A" +
        "Name: " + name + "%0A" +
        "Phone: " + phone + "%0A" +
        "Email: " + email + "%0A" +
        "Occasion: " + occasion + "%0A" +
        "Cake Type: " + cakeType + "%0A" +
        "Cake Size: " + size + "%0A" +
        "Preferred Date: " + date + "%0A" +
        "Budget: " + budget + "%0A%0A" +
        "Design Details:%0A" +
        message;

    const whatsappNumber = "2340000000000";

    whatsappLink.href =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        enquiry;

    customCakeForm.style.display = "none";

    formSuccess.classList.add("active");

    formSuccess.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});


editEnquiry.addEventListener("click", function () {

    formSuccess.classList.remove("active");

    customCakeForm.style.display = "block";

    customCakeForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});