const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const yearElement = document.getElementById("year");

// Display the current year in the footer
yearElement.textContent = new Date().getFullYear();

// Open and close the mobile navigation menu
menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute(
        "aria-label",
        isExpanded ? "Open navigation menu" : "Close navigation menu"
    );

    navLinks.classList.toggle("open", !isExpanded);
});

// Close the mobile menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

// Close the mobile menu when switching to desktop width
window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});

// Reveal sections and cards as they enter the screen
const revealElements = document.querySelectorAll(
    ".hero-content, .hero-visual, .section-heading, " +
    ".service-card, .about-content, .contact-box"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

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

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}
