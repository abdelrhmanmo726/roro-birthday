// Floating Storyline Progress Tracker
const STEPS = [
    { id: "login", label: "Passcode", icon: "🔑" },
    { id: "puzzle1", label: "Sweet Cake", icon: "🎂" },
    { id: "puzzle2", label: "Graduation", icon: "🎓" },
    { id: "puzzle3", label: "Spider-Kid", icon: "🕷️" },
    { id: "ending", label: "Grand Wish", icon: "✨" }
];

let trackerEl = null;

export function initStoryProgressTracker() {
    if (typeof document === "undefined") return;

    if (!trackerEl) {
        trackerEl = document.querySelector(".story-tracker");
    }

    if (trackerEl) return;

    trackerEl = document.createElement("nav");
    trackerEl.className = "story-tracker";
    trackerEl.setAttribute("aria-label", "Birthday Journey Tracker");

    trackerEl.innerHTML = STEPS.map((step, idx) => `
        <div class="tracker-step ${idx === 0 ? 'active' : ''}" data-step="${idx}">
            <span class="tracker-step__icon">${step.icon}</span>
            <span class="tracker-step__label">${step.label}</span>
        </div>
        ${idx < STEPS.length - 1 ? `<span class="tracker-divider">›</span>` : ''}
    `).join("");

    document.body.appendChild(trackerEl);
}

export function updateStoryProgress(stepIndex) {
    if (!trackerEl) initStoryProgressTracker();
    if (!trackerEl) return;

    const stepNodes = trackerEl.querySelectorAll(".tracker-step");
    stepNodes.forEach((node, idx) => {
        node.classList.remove("active", "past");
        if (idx === stepIndex) {
            node.classList.add("active");
        } else if (idx < stepIndex) {
            node.classList.add("past");
        }
    });

    const dividerNodes = trackerEl.querySelectorAll(".tracker-divider");
    dividerNodes.forEach((divider, idx) => {
        if (idx < stepIndex) {
            divider.classList.add("past");
        } else {
            divider.classList.remove("past");
        }
    });
}

export function setStoryTrackerVisible(visible) {
    if (!trackerEl) return;
    trackerEl.classList.toggle("hidden", !visible);
}


