import { gsap } from "gsap";

let initialized = false;

export function initParallaxGyroscope() {
    if (initialized || typeof window === "undefined") return;
    initialized = true;

    // 1. Mobile Gyroscope Tilt
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", (e) => {
            if (e.gamma === null || e.beta === null) return;
            // Clamped tilt
            const tiltX = Math.max(-15, Math.min(15, e.gamma)) * 0.4;
            const tiltY = Math.max(-15, Math.min(15, e.beta - 45)) * 0.3;

            applyParallax(tiltX, tiltY);
        }, { passive: true });
    }

    // 2. Desktop Mouse Parallax
    window.addEventListener("mousemove", (e) => {
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 8;
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 8;

        applyParallax(xPercent, yPercent);
    }, { passive: true });
}

function applyParallax(xDeg, yDeg) {
    const targets = document.querySelectorAll(".login-card, .master-bouquet-container, .proposal-container, .cinematic-letter-card, .polaroid-card");
    if (!targets.length) return;

    gsap.to(targets, {
        rotationY: xDeg,
        rotationX: -yDeg,
        transformPerspective: 1200,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto"
    });
}
