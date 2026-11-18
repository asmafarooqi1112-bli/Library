
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

// Reveal sections when they enter the screen
const sections = document.querySelectorAll(
    ".section, .final-section"
);

const observer = new IntersectionObserver(
    (entries) => {
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

sections.forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
});
