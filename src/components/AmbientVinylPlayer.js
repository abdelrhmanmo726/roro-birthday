import { startBackgroundMusic, stopBackgroundMusic } from "../core/AudioManager.js";

let playerEl = null;
let isPlaying = false;

export function initAmbientVinylPlayer() {
    window.__setVinylPlaying = setVinylPlaying;
    if (playerEl || typeof document === "undefined") return;

    playerEl = document.createElement("aside");
    playerEl.className = "vinyl-player-widget";
    playerEl.setAttribute("role", "button");
    playerEl.setAttribute("aria-label", "Toggle Background Music");

    playerEl.innerHTML = `
        <div class="vinyl-disc"></div>
        <div class="vinyl-info">
            <span class="vinyl-title">Roro's Melody</span>
            <div class="vinyl-status">
                <span class="status-text">Tap to Play</span>
                <div class="sound-waves">
                    <span class="sound-bar"></span>
                    <span class="sound-bar"></span>
                    <span class="sound-bar"></span>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(playerEl);

    playerEl.addEventListener("click", () => {
        toggleMusic();
    });
}

export function setVinylPlaying(playing) {
    isPlaying = playing;
    if (!playerEl) return;

    const statusText = playerEl.querySelector(".status-text");

    if (isPlaying) {
        playerEl.classList.add("playing");
        if (statusText) statusText.textContent = "Playing ❤️";
    } else {
        playerEl.classList.remove("playing");
        if (statusText) statusText.textContent = "Muted 🌙";
    }
}

function toggleMusic() {
    if (isPlaying) {
        stopBackgroundMusic();
        setVinylPlaying(false);
    } else {
        startBackgroundMusic();
        setVinylPlaying(true);
    }
}
