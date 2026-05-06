console.log("INFO: js linked");

// Collapsible sections (safe for all pages)
const sections = document.querySelectorAll(".section");

sections.forEach(section => {
    const header = section.querySelector(".section-header");
    if (!header) return; // skip if page doesn't use collapsible

    header.addEventListener("click", () => {
        toggleSection(section);
    });
});

// Crown selector (only if exists)
const crownIcons = document.querySelectorAll(".crown-selector img");

if (crownIcons.length > 0) {
    crownIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const id = icon.getAttribute("data-target");
            const section = document.getElementById(id);

            if (!section) return;

            toggleSection(section);

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

// Toggle logic (shared)
function toggleSection(target) {
    sections.forEach(section => {
        if (section === target) {
            section.classList.toggle("active");
        } else {
            section.classList.remove("active");
        }
    });
}