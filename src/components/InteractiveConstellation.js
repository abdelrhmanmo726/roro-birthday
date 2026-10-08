import { playMagicChime } from "../core/SoundEffects.js";

let buttonEl = null;
let overlayEl = null;
let bannerEl = null;
let isActive = false;
let timeoutId = null;

export function initInteractiveConstellation() {
    if (buttonEl || typeof document === "undefined") return;

    buttonEl = document.createElement("button");
    buttonEl.className = "constellation-trigger-btn";
    buttonEl.setAttribute("type", "button");
    buttonEl.setAttribute("aria-label", "Show Roro Star Constellation");
    buttonEl.innerHTML = `<span>✨</span><span>Stars</span>`;

    document.body.appendChild(buttonEl);

    overlayEl = document.createElement("div");
    overlayEl.className = "constellation-overlay";
    overlayEl.innerHTML = createConstellationSvg();
    document.body.appendChild(overlayEl);

    buttonEl.addEventListener("click", () => {
        toggleConstellation();
    });
}

function createConstellationSvg() {
    // Beautiful stylized starry paths spelling R - O - R - O and a heart
    return `
        <svg viewBox="0 0 1000 600" width="100%" height="100%" style="position: absolute; inset: 0;" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <!-- Constellation Lines -->
            <g stroke="rgba(233, 196, 106, 0.75)" stroke-width="2" stroke-dasharray="4,4" fill="none" filter="url(#starGlow)">
                <!-- R1 -->
                <polyline points="200,240 200,380" />
                <path d="M200,240 C250,240 250,310 200,310" />
                <line x1="200" y1="310" x2="250" y2="380" />

                <!-- O1 -->
                <ellipse cx="340" cy="310" rx="40" ry="60" />

                <!-- R2 -->
                <polyline points="470,240 470,380" />
                <path d="M470,240 C520,240 520,310 470,310" />
                <line x1="470" y1="310" x2="520" y2="380" />

                <!-- O2 -->
                <ellipse cx="610" cy="310" rx="40" ry="60" />

                <!-- Heart -->
                <path d="M750,290 C750,260 720,250 705,270 C690,250 660,260 660,290 C660,330 705,360 705,370 C705,360 750,330 750,290 Z" 
                      stroke="#ff5f9e" stroke-width="2.5" fill="rgba(255, 95, 158, 0.15)" />
            </g>

            <!-- Star Nodes -->
            <g fill="#FFFDFB" filter="url(#starGlow)">
                <!-- R1 stars -->
                <circle cx="200" cy="240" r="4.5" />
                <circle cx="200" cy="310" r="4" />
                <circle cx="200" cy="380" r="4.5" />
                <circle cx="240" cy="275" r="4" />
                <circle cx="250" cy="380" r="4.5" />

                <!-- O1 stars -->
                <circle cx="340" cy="250" r="4.5" />
                <circle cx="380" cy="310" r="4" />
                <circle cx="340" cy="370" r="4.5" />
                <circle cx="300" cy="310" r="4" />

                <!-- R2 stars -->
                <circle cx="470" cy="240" r="4.5" />
                <circle cx="470" cy="310" r="4" />
                <circle cx="470" cy="380" r="4.5" />
                <circle cx="510" cy="275" r="4" />
                <circle cx="520" cy="380" r="4.5" />

                <!-- O2 stars -->
                <circle cx="610" cy="250" r="4.5" />
                <circle cx="650" cy="310" r="4" />
                <circle cx="610" cy="370" r="4.5" />
                <circle cx="570" cy="310" r="4" />

                <!-- Heart Star -->
                <circle cx="705" cy="270" r="5" fill="#ff7eb3" />
                <circle cx="705" cy="370" r="4.5" fill="#ff7eb3" />
            </g>
        </svg>
    `;
}

function toggleConstellation() {
    if (isActive) {
        hideConstellation();
    } else {
        showConstellation();
    }
}

function showConstellation() {
    isActive = true;
    overlayEl.classList.add("active");
    playMagicChime();

    if (!bannerEl) {
        bannerEl = document.createElement("div");
        bannerEl.className = "constellation-banner";
        bannerEl.innerHTML = `✨ The stars in the sky align for you, Roro ❤️`;
        document.body.appendChild(bannerEl);
    }

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        hideConstellation();
    }, 4500);
}

function hideConstellation() {
    isActive = false;
    overlayEl.classList.remove("active");
    if (bannerEl) {
        bannerEl.remove();
        bannerEl = null;
    }
}
