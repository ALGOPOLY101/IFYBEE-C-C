const menuButton = document.querySelector(".menu-button");
const closeMenu = document.querySelector(".close-menu");
const menuOverlay = document.querySelector(".menu-overlay");

function openMenu() {
    document.body.classList.add("menu-open");

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", "true");
    }
}

function closeMenuPanel() {
    document.body.classList.remove("menu-open");

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
    }
}

if (menuButton) {
    menuButton.addEventListener("click", openMenu);
}

if (closeMenu) {
    closeMenu.addEventListener("click", closeMenuPanel);
}

if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenuPanel);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenuPanel();
    }
});

const menuLinks = document.querySelectorAll(".side-menu-links a");

menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenuPanel);
});


const revealItems = document.querySelectorAll(".reveal-item");

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


const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) {
        return;
    }

    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach((otherItem) => {

            const otherQuestion = otherItem.querySelector(".faq-question");
            const otherAnswer = otherItem.querySelector(".faq-answer");

            otherItem.classList.remove("active");

            if (otherQuestion) {
                otherQuestion.setAttribute("aria-expanded", "false");
            }

            if (otherAnswer) {
                otherAnswer.style.maxHeight = null;
            }

        });

        if (!isActive) {

            item.classList.add("active");

            question.setAttribute("aria-expanded", "true");

            answer.style.maxHeight = answer.scrollHeight + "px";

        }

    });

});


const videoPlayButton = document.querySelector(".video-play");

if (videoPlayButton) {

    videoPlayButton.addEventListener("click", () => {

        const videoSection = document.querySelector(".video-section");

        if (!videoSection) {
            return;
        }

        let message = videoSection.querySelector(".video-message");

        if (!message) {

            message = document.createElement("p");

            message.className = "video-message";

            message.textContent =
                "The Ifybee's custom cake video will be added here.";

            message.style.marginTop = "15px";
            message.style.color = "#d6b46a";

            videoSection.querySelector(".video-content").appendChild(message);

        }

    });

}


const customForm = document.querySelector(".custom-form");

if (customForm) {

    customForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const formMessage = customForm.querySelector(".form-message");

        if (!formMessage) {
            return;
        }

        formMessage.textContent =
            "Your request form is ready. Backend submission will be connected later.";

    });

}


const referenceImage = document.querySelector("#reference-image");

if (referenceImage) {

    referenceImage.addEventListener("change", () => {

        const uploadArea = referenceImage.closest(".file-upload");

        if (!uploadArea) {
            return;
        }

        const text = uploadArea.querySelector("span");

        if (!text) {
            return;
        }

        if (referenceImage.files.length > 0) {

            text.textContent =
                referenceImage.files[0].name;

        } else {

            text.textContent =
                "Choose an image for inspiration";

        }

    });

}


const shineElements = document.querySelectorAll(".image-shine");

shineElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
        element.classList.add("shining");
    });

    element.addEventListener("mouseleave", () => {
        element.classList.remove("shining");
    });

});