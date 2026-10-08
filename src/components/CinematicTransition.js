import gsap from "gsap";
import eyesImage from "../assets/images/eyes.jpg";
import eyesSongAudio from "../assets/audio/eyes-song.mp3";
import {
    playHeartbeat,
    playMagicChime,
    playCandleBreeze,
    startCinematicPianoSoundscape,
    stopCinematicPianoSoundscape
} from "../core/SoundEffects.js";
import { downloadEyesKeepsake } from "../core/EyesKeepsake.js";

export function createCinematicTransition(onComplete, onBackToLetter, onBackToCake) {
    const overlay = document.createElement("div");
    overlay.className = "cinematic-eyes-overlay";

    overlay.innerHTML = `
        <div class="cinematic-backdrop"></div>

        <!-- 1. Eyelid Shutter Transition (جفون العين المنفتحة) -->
        <div class="eyelid-shutter eyelid-shutter--top"></div>
        <div class="eyelid-shutter eyelid-shutter--bottom"></div>

        <!-- 2. Widescreen Letterbox Screen Frame -->
        <div class="cinematic-screen-frame">
            <div class="cinematic-image-container" id="eyes-3d-container">
                <img
                    src="${eyesImage}"
                    alt="Eyes"
                    class="cinematic-eyes-img"
                />

                <!-- Pupil Catchlights (وميض لمعة البؤبؤ) -->
                <div class="pupil-catchlight pupil-catchlight--left"></div>
                <div class="pupil-catchlight pupil-catchlight--right"></div>

                <!-- Warm Lens Flare -->
                <div class="cinematic-lens-flare"></div>
            </div>
        </div>

        <!-- 3. Floating Dust & Starlight Particle Canvas -->
        <canvas class="cinematic-particles-canvas" id="eyes-particles"></canvas>

        <!-- 4. Vignette & Film Grain -->
        <div class="cinematic-vignette"></div>
        <div class="cinematic-grain"></div>

        <!-- 5. Cinematic Subtitle Stage (English Centered) -->
        <div class="cinematic-text-stage">
            <h2 class="cinematic-text-line"></h2>
        </div>

        <!-- 6. Scene Controls -->
        <div class="cinematic-scene-controls">
            <button type="button" class="cinematic-save-btn" id="save-eyes-keepsake-btn">
                📸 Save Keepsake
            </button>
        </div>

        <!-- 7. Grand Outro Card (الخاتمة الدافئة) -->
        <div class="cinematic-outro-card" id="eyes-outro-card">
            <div class="outro-sparkle">✨</div>
            <h2 class="outro-title">Happy Birthday, Roro ❤️</h2>
            <p class="outro-quote">“ May your days always be as bright and beautiful as your eyes. ”</p>
            <div class="outro-signature">— Abdelrhman</div>

            <div class="outro-actions">
                <button type="button" class="outro-btn outro-btn--primary" id="outro-read-letter-btn">
                    💌 Re-read Letter
                </button>
                <button type="button" class="outro-btn" id="outro-replay-scene-btn">
                    👁️ Replay Cinematic Scene
                </button>
                <button type="button" class="outro-btn outro-btn--save" id="outro-save-btn">
                    📸 Save Memory Photo
                </button>
                <button type="button" class="outro-btn outro-btn--restart" id="outro-restart-btn">
                    ↻ Start From Beginning
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const textLine = overlay.querySelector(".cinematic-text-line");
    const imgEl = overlay.querySelector(".cinematic-eyes-img");
    const container3D = overlay.querySelector("#eyes-3d-container");
    const leftCatchlight = overlay.querySelector(".pupil-catchlight--left");
    const rightCatchlight = overlay.querySelector(".pupil-catchlight--right");
    const outroCard = overlay.querySelector("#eyes-outro-card");
    const particlesCanvas = overlay.querySelector("#eyes-particles");

    // ==========================================
    // A. FLOATING DUST MOTES & STARLIGHT CANVAS
    // ==========================================
    let animFrameId = null;
    let particles = [];
    if (particlesCanvas) {
        const pCtx = particlesCanvas.getContext("2d");
        const resizeCanvas = () => {
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 1.6 + 0.6,
                speedY: -(Math.random() * 0.35 + 0.15),
                speedX: (Math.random() - 0.5) * 0.25,
                opacity: Math.random() * 0.6 + 0.2,
                oscSpeed: Math.random() * 0.02 + 0.01,
                oscOffset: Math.random() * Math.PI * 2
            });
        }

        const renderParticles = () => {
            if (!pCtx) return;
            pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

            particles.forEach((p) => {
                p.y += p.speedY;
                p.x += p.speedX + Math.sin(p.oscOffset) * 0.2;
                p.oscOffset += p.oscSpeed;

                if (p.y < -10) p.y = particlesCanvas.height + 10;
                if (p.x < -10) p.x = particlesCanvas.width + 10;
                if (p.x > particlesCanvas.width + 10) p.x = -10;

                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                pCtx.fillStyle = `rgba(255, 220, 180, ${p.opacity})`;
                pCtx.shadowColor = "rgba(255, 200, 140, 0.8)";
                pCtx.shadowBlur = 4;
                pCtx.fill();
            });

            animFrameId = requestAnimationFrame(renderParticles);
        };
        renderParticles();
    }

    // ==========================================
    // B. 3D GYROSCOPE & MOUSE PARALLAX
    // ==========================================
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const onMouseMove = (e) => {
        const xPercent = (e.clientX / window.innerWidth) - 0.5;
        const yPercent = (e.clientY / window.innerHeight) - 0.5;
        targetTiltX = -yPercent * 5;
        targetTiltY = xPercent * 5;
    };

    const onDeviceOrientation = (e) => {
        if (e.beta !== null && e.gamma !== null) {
            targetTiltX = Math.max(-6, Math.min(6, (e.beta - 45) * 0.2));
            targetTiltY = Math.max(-6, Math.min(6, e.gamma * 0.2));
        }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("deviceorientation", onDeviceOrientation);

    const updateTilt = () => {
        currentTiltX += (targetTiltX - currentTiltX) * 0.08;
        currentTiltY += (targetTiltY - currentTiltY) * 0.08;
        if (container3D) {
            container3D.style.transform = `perspective(1000px) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
        }
        requestAnimationFrame(updateTilt);
    };
    updateTilt();

    // ==========================================
    // C. STAR DISSOLVE EFFECT ON CLIMAX
    // ==========================================
    function triggerStarDissolve() {
        const rect = textLine.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;

        const leftPupil = leftCatchlight.getBoundingClientRect();
        const rightPupil = rightCatchlight.getBoundingClientRect();

        for (let i = 0; i < 35; i++) {
            const star = document.createElement("div");
            star.style.position = "fixed";
            star.style.left = `${startX + (Math.random() - 0.5) * rect.width * 0.8}px`;
            star.style.top = `${startY + (Math.random() - 0.5) * 30}px`;
            star.style.width = `${Math.random() * 5 + 3}px`;
            star.style.height = star.style.width;
            star.style.borderRadius = "50%";
            star.style.backgroundColor = "#fff";
            star.style.boxShadow = "0 0 10px rgba(255, 215, 180, 0.95)";
            star.style.zIndex = "45";
            star.style.pointerEvents = "none";
            overlay.appendChild(star);

            const targetPupil = i % 2 === 0 ? leftPupil : rightPupil;
            const targetX = targetPupil.left + targetPupil.width / 2;
            const targetY = targetPupil.top + targetPupil.height / 2;

            gsap.to(star, {
                x: targetX - parseFloat(star.style.left),
                y: targetY - parseFloat(star.style.top),
                scale: 0.2,
                opacity: 0,
                duration: 1.4 + Math.random() * 0.5,
                ease: "power2.inOut",
                onComplete: () => star.remove()
            });
        }
    }

    // ==========================================
    // D. AUDIO TRACK CONTROLLER (EYES SONG)
    // ==========================================
    let currentAudioEl = null;

    function playAudioTrack() {
        stopAudioTrack();
        try {
            currentAudioEl = new Audio(eyesSongAudio);
            currentAudioEl.loop = true; // Song keeps playing seamlessly on loop, even after card appears!
            currentAudioEl.volume = 0;
            currentAudioEl.play().then(() => {
                let vol = 0;
                const fadeIn = setInterval(() => {
                    vol = Math.min(1, vol + 0.05);
                    if (currentAudioEl) currentAudioEl.volume = vol;
                    if (vol >= 1) clearInterval(fadeIn);
                }, 50);
            }).catch((err) => {
                console.warn("Audio autoplay blocked, using fallback", err);
                startCinematicPianoSoundscape();
            });
        } catch (e) {
            startCinematicPianoSoundscape();
        }
    }

    function stopAudioTrack() {
        stopCinematicPianoSoundscape();
        if (currentAudioEl) {
            try {
                const audioToStop = currentAudioEl;
                currentAudioEl = null;
                let vol = audioToStop.volume;
                const fadeOut = setInterval(() => {
                    vol = Math.max(0, vol - 0.1);
                    audioToStop.volume = vol;
                    if (vol <= 0) {
                        clearInterval(fadeOut);
                        audioToStop.pause();
                    }
                }, 40);
            } catch (e) {}
        }
    }

    // ==========================================
    // E. MAIN CINEMATIC TIMELINE
    // ==========================================
    let masterTl = null;

    function playCinematicSequence() {
        // Reset states
        gsap.set(overlay, { opacity: 0 });
        gsap.set(imgEl, { opacity: 0, scale: 1.0, filter: "blur(12px)" });
        gsap.set(textLine, { opacity: 0, y: 16 });
        gsap.set([leftCatchlight, rightCatchlight], { opacity: 0 });
        outroCard.classList.remove("outro--visible");
        overlay.classList.remove("eyelids-open");

        // Fade in whole black stage
        gsap.to(overlay, { opacity: 1, duration: 0.8, ease: "power2.inOut" });

        masterTl = gsap.timeline();

        // 1. Heartbeats in darkness
        masterTl.call(() => playHeartbeat(0.55), null, 0.3)
                .call(() => playHeartbeat(0.7), null, 1.3)
                .call(() => playHeartbeat(0.6), null, 2.3);

        // 2. Open Eyelids smoothly & Start Song
        masterTl.call(() => {
            overlay.classList.add("eyelids-open");
            playCandleBreeze();
            playAudioTrack();
        }, null, 1.8);

        // 3. Ultra-smooth continuous slow push-in (Ken Burns throughout entire scene)
        masterTl.to(imgEl, {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1.08,
            duration: 28,
            ease: "none"
        }, 2.0);

        // 4. Catchlights appearance
        masterTl.to([leftCatchlight, rightCatchlight], {
            opacity: 0.9,
            duration: 1.8,
            ease: "power2.out"
        }, 3.0);

        // 5. SUBTITLE SEQUENCE (ENGLISH ONLY CENTERED AT BOTTOM)
        const englishSubtitles = [
            { text: "You know, in the end...", start: 2.6, hold: 2.8 },
            { text: "There's one little truth I keep with me.", start: 7.4, hold: 3.2 },
            { text: "Every time we talk...", start: 12.4, hold: 2.8 },
            { text: "I find myself getting lost in your eyes.", start: 17.0, hold: 3.5, climax: true },
            { text: "They just... stay with me, always.", start: 22.6, hold: 4.0 }
        ];

        englishSubtitles.forEach((sub) => {
            // Set text & start fade in
            masterTl.call(() => {
                textLine.textContent = sub.text;
            }, null, sub.start);

            masterTl.to(textLine, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power2.out"
            }, sub.start + 0.05);

            // Climax star dissolve if marked
            if (sub.climax) {
                masterTl.call(triggerStarDissolve, null, sub.start + 2.3);
                masterTl.call(playMagicChime, null, sub.start + 2.4);
            }

            // Fade out
            masterTl.to(textLine, {
                opacity: 0,
                y: -10,
                duration: 0.55,
                ease: "power2.in"
            }, sub.start + sub.hold);
        });

        // 6. FINALE: Reveal Grand Outro Card (Song continues playing uninterrupted!)
        masterTl.call(() => {
            outroCard.classList.add("outro--visible");
            playMagicChime();
        }, null, 28.2);
    }

    // Run sequence initially
    playCinematicSequence();

    // ==========================================
    // E. CLEANUP HELPER
    // ==========================================
    function cleanupAndClose(callback) {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("deviceorientation", onDeviceOrientation);
        stopAudioTrack();

        gsap.to(overlay, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
                overlay.remove();
                if (callback) callback();
            }
        });
    }

    // ==========================================
    // F. BUTTON EVENT LISTENERS
    // ==========================================
    // 1. Save Keepsake Button
    const saveBtn = overlay.querySelector("#save-eyes-keepsake-btn");
    const outroSaveBtn = overlay.querySelector("#outro-save-btn");
    const handleSave = async (btn) => {
        btn.disabled = true;
        const prev = btn.innerHTML;
        btn.innerHTML = "⏳ Saving...";
        try {
            await downloadEyesKeepsake();
            playMagicChime();
            btn.innerHTML = "✓ Saved!";
        } catch (e) {
            btn.innerHTML = prev;
        } finally {
            setTimeout(() => {
                btn.innerHTML = prev;
                btn.disabled = false;
            }, 2000);
        }
    };
    if (saveBtn) saveBtn.onclick = () => handleSave(saveBtn);
    if (outroSaveBtn) outroSaveBtn.onclick = () => handleSave(outroSaveBtn);

    // 2. Re-read Letter Button
    const readLetterBtn = overlay.querySelector("#outro-read-letter-btn");
    if (readLetterBtn) {
        readLetterBtn.onclick = () => {
            cleanupAndClose(() => {
                if (onBackToLetter) onBackToLetter();
            });
        };
    }

    // 3. Replay Cinematic Scene Button
    const replayBtn = overlay.querySelector("#outro-replay-scene-btn");
    if (replayBtn) {
        replayBtn.onclick = () => {
            if (masterTl) masterTl.kill();
            stopAudioTrack();
            playCinematicSequence();
        };
    }

    // 4. Restart / Start From Beginning Button
    const restartBtn = overlay.querySelector("#outro-restart-btn");
    if (restartBtn) {
        restartBtn.onclick = () => {
            cleanupAndClose(() => {
                if (onComplete) onComplete();
            });
        };
    }
}