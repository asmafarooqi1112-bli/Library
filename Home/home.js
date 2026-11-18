
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

// Mobile Menu
menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("show");
});

// Close menu after clicking a link
const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("show");
    });
});

// Current Year
document.getElementById("year").textContent =
    new Date().getFullYear();
