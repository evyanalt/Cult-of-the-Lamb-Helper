console.log("INFO: JavaScript linked");
console.log("DEBUG: Searching for collapsible sections and crown selectors...");

// Collapsible sections (safe for all pages)
const sections = document.querySelectorAll(".section");
console.log(`DEBUG: Found ${sections.length} section(s)`);

sections.forEach(section => {
    const header = section.querySelector(".section-header");
    if (!header) {
        console.log("DEBUG: Section skipped because it has no .section-header");
        return; // skip if page doesn't use collapsible
    }

    console.log(`DEBUG: Attaching click listener to section header: ${header.textContent.trim() || '[no text]'}`);
    header.addEventListener("click", () => {
        console.log(`INFO: Section header clicked -> ${header.textContent.trim() || '[no text]'}`);
        toggleSection(section);
    });
});

// Crown selector (only if exists)
const crownIcons = document.querySelectorAll(".crown-selector img");
console.log(`DEBUG: Found ${crownIcons.length} crown icon(s)`);

if (crownIcons.length > 0) {
    crownIcons.forEach(icon => {
        const targetId = icon.getAttribute("data-target");
        console.log(`DEBUG: Attaching click listener to crown icon for target '${targetId}'`);

        icon.addEventListener("click", () => {
            console.log(`INFO: Crown icon clicked, target '${targetId}'`);
            const section = document.getElementById(targetId);

            if (!section) {
                console.warn(`WARN: No section found with id '${targetId}'`);
                return;
            }

            toggleSection(section);
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            console.log(`DEBUG: Scrolled into view for section id '${targetId}'`);
        });
    });
}

if (sections.length === 0 && crownIcons.length === 0) {
    console.log("DEBUG: No interactive elements found on this page.");
}

// Toggle logic (shared)
function toggleSection(target) {
    console.log(`DEBUG: toggleSection called for target id='${target.id || '[no-id]'}'`);
    sections.forEach(section => {
        if (section === target) {
            const activeBefore = section.classList.contains("active");
            section.classList.toggle("active");
            const activeAfter = section.classList.contains("active");
            console.log(`INFO: Section '${target.id || '[no-id]'}' ${activeAfter ? 'opened' : 'closed'} (was ${activeBefore ? 'open' : 'closed'})`);
        } else {
            if (section.classList.contains("active")) {
                section.classList.remove("active");
                console.log(`DEBUG: Closed other section '${section.id || '[no-id]'}'`);
            }
        }
    });
}