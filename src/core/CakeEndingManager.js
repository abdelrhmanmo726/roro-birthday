import { gsap } from "gsap";
import confetti from "canvas-confetti";
import birthdaySong from "../assets/sounds/happy_birthday.mp3";
import { Login } from "../pages/Login.js";
import { navigate } from "./Router.js";
import { createCinematicTransition } from "../components/CinematicTransition.js";
import { stopAllAudio } from "./AudioManager.js";
import { playMagicChime, playCandleBreeze, playSealStamp } from "./SoundEffects.js";
import { startBalloonsAndFireworks } from "./BalloonsFireworks.js";
import { downloadLetterKeepsake } from "./LetterKeepsake.js";

const STATES = {
    INIT: "INIT",
    GIFT_WAITING: "GIFT_WAITING",
    GIFT_OPENING: "GIFT_OPENING",
    CELEBRATION_SHOWING: "CELEBRATION_SHOWING",
    CAKE_READY: "CAKE_READY",
    LISTENING_MIC: "LISTENING_MIC",
    CANDLE_EXTINGUISHED: "CANDLE_EXTINGUISHED",
    ENDED: "ENDED"
};

const ALLOWED_TRANSITIONS = {
    [STATES.INIT]: [STATES.GIFT_WAITING],
    [STATES.GIFT_WAITING]: [STATES.GIFT_OPENING],
    [STATES.GIFT_OPENING]: [STATES.CELEBRATION_SHOWING],
    [STATES.CELEBRATION_SHOWING]: [STATES.CAKE_READY],
    [STATES.CAKE_READY]: [STATES.LISTENING_MIC, STATES.CANDLE_EXTINGUISHED],
    [STATES.LISTENING_MIC]: [STATES.CANDLE_EXTINGUISHED],
    [STATES.CANDLE_EXTINGUISHED]: [STATES.ENDED],
    [STATES.ENDED]: []
};

const SELECTORS = {
    starsCanvas: '[data-element="stars-canvas"]',
    giftWrapper: '[data-element="gift-wrapper"]',
    giftLid: '[data-element="gift-lid"]',
    giftFlash: '[data-element="gift-flash"]',
    celebrationStage: '[data-element="celebration-stage"]',
    birthdayCard: '[data-element="birthday-card"]',
    cakeSection: '[data-element="cake-section"]',
    cakeWrapper: '[data-element="cake-wrapper"]',
    flame: '[data-element="candle-flame"]',
    glow: '[data-element="candle-glow"]',
    smoke: '[data-element="candle-smoke"]',
    micBtn: '[data-element="start-mic-btn"]',
    blowInstruction: '[data-element="blow-instruction"]',
    cinematicEnding: '[data-element="cinematic-ending"]',
    nextMemoryBtn: '[data-element="next-memory-btn"]'
};

const cpuCores = (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) ? navigator.hardwareConcurrency : 8;
const memory = (typeof navigator !== 'undefined' && navigator.deviceMemory) ? navigator.deviceMemory : 8;
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLowPowerDevice = cpuCores <= 4 || memory <= 4 || prefersReducedMotion;

const CONFIG = {
    CALIBRATION_DURATION_MS: 500,
    LOW_BINS_COUNT: 12,
    EMA_ALPHA: 0.25,
    PARTICLE_COUNT_DESKTOP: isLowPowerDevice ? 30 : 60,
    PARTICLE_COUNT_MOBILE: isLowPowerDevice ? 15 : 30,
    COLORS: {
        pink: '#F7A8C4',
        gold: '#E9C46A',
        white: '#FFFDFB',
        spark: '#E9C46A'
    }
};

export function initCakeEndingManager(rootElement = document) {
    let currentState = STATES.INIT;

    let audioContext = null;
    let analyser = null;
    let microphoneNode = null;
    let microphoneStream = null;

    let freqData = null;
    let timeData = null;

    let isDestroyed = false;
    let micStartTime = 0;

    let emaFreqVol = 0;
    let emaRMS = 0;

    let ambientNoiseFloorFreq = 0;
    let ambientNoiseFloorRMS = 0;
    let blowStarted = 0;

    const activeTimelines = [];
    const flameTweens = [];
    const standaloneTweens = [];

    let particleAnimationId = null;
    let blowFrameId = null;
    let confettiIntervalId = null;

    let resizeHandler = null;
    let birthdayAudio = null;
    let letterTypewriterTimeout = null;

    const els = {};
    for (const [key, selector] of Object.entries(SELECTORS)) {
        els[key] = rootElement.querySelector(selector);
    }

    function transitionTo(nextState) {
        if (isDestroyed) return false;
        const validNextStates = ALLOWED_TRANSITIONS[currentState] || [];
        if (validNextStates.includes(nextState)) {
            currentState = nextState;
            return true;
        }
        return false;
    }

    function getAudioInstance() {
        if (!birthdayAudio) {
            birthdayAudio = new Audio(birthdaySong);
            birthdayAudio.preload = "auto";
            birthdayAudio.volume = 0.85;
        }
        return birthdayAudio;
    }

    function createTimeline(config = {}) {
        const tl = gsap.timeline(config);
        activeTimelines.push(tl);

        const removeTimeline = () => {
            const index = activeTimelines.indexOf(tl);
            if (index > -1) {
                activeTimelines.splice(index, 1);
            }
        };

        tl.eventCallback("onComplete", removeTimeline);
        tl.eventCallback("onInterrupt", removeTimeline);

        return tl;
    }

    function trackTween(tween) {
        standaloneTweens.push(tween);
        return tween;
    }

    setupFloatingBokeh();
    showGift();

    function showGift() {
        if (!els.giftWrapper) return;
        if (!transitionTo(STATES.GIFT_WAITING)) return;

        els.giftWrapper.classList.remove("gift-box-container--hidden");

        trackTween(gsap.fromTo(els.giftWrapper,
            { y: -100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 0.2 }
        ));

        els.giftWrapper.addEventListener("click", openGift, { once: true });
    }

    function openGift() {
        if (!transitionTo(STATES.GIFT_OPENING)) return;

        if (els.giftWrapper) {
            els.giftWrapper.blur();
            els.giftWrapper.disabled = true;
            els.giftWrapper.inert = true;
        }

        const tl = createTimeline();

        tl.to(els.giftWrapper, { rotation: 2, repeat: 3, yoyo: true, duration: 0.1 })
          .to(els.giftWrapper, { rotation: 0, duration: 0.05 });

        if (els.giftLid) {
            tl.to(els.giftLid, { y: -160, rotation: 18, opacity: 0, duration: 0.8, ease: "power2.out" });
        }

        tl.call(playSoftFlash)
          .to(els.giftWrapper, { scale: 0.5, opacity: 0, duration: 0.5, ease: "power1.out" }, "-=0.3")
          .call(() => {
              gsap.set(els.giftWrapper, { display: "none", pointerEvents: "none" });
              showCardSequence();
          });
    }

    function playSoftFlash() {
        if (els.giftFlash) {
            els.giftFlash.classList.remove("memory-box-stage__flash--hidden");
            trackTween(gsap.fromTo(els.giftFlash,
                { opacity: 0 },
                {
                    opacity: 0.85, duration: 0.25, repeat: 1, yoyo: true,
                    onComplete: () => els.giftFlash.classList.add("memory-box-stage__flash--hidden")
                }
            ));
        }
        playMagicChime();
        fireSparkles();
    }

    function showCardSequence() {
        if (!els.celebrationStage || !els.birthdayCard) return;
        if (!transitionTo(STATES.CELEBRATION_SHOWING)) return;

        els.celebrationStage.classList.remove("celebration-stage--hidden");
        els.birthdayCard.classList.remove("polaroid-card--hidden");

        const tl = createTimeline();

        tl.fromTo(els.birthdayCard,
            { opacity: 0, y: 30, scale: 0.85, rotate: -6 },
            { opacity: 1, y: 0, scale: 1, rotate: -3, duration: 1.1, ease: "power3.out" }
        );

        tl.call(() => {
            showCake();
        });
    }

    function showCake() {
        if (!els.cakeSection) return;

        els.cakeSection.classList.remove("cake-stage--hidden");
        if (els.cakeWrapper) els.cakeWrapper.style.display = "flex";

        const tl = createTimeline();

        const layerBottom = els.cakeWrapper.querySelector(".dreamy-cake__layer--bottom");
        const layerMiddle = els.cakeWrapper.querySelector(".dreamy-cake__layer--middle");
        const layerTop = els.cakeWrapper.querySelector(".dreamy-cake__layer--top");
        const plate = els.cakeWrapper.querySelector(".dreamy-cake__plate");
        const candleBody = els.cakeWrapper.querySelector(".candle__body");
        const candleWick = els.cakeWrapper.querySelector(".candle__wick");

        tl.from(layerBottom, { opacity: 0, y: 25, duration: 0.4, ease: "power2.out" })
          .from(layerMiddle, { opacity: 0, y: 20, duration: 0.35, ease: "power2.out" }, "-=0.15")
          .from(layerTop, { opacity: 0, y: 15, duration: 0.3, ease: "power2.out" }, "-=0.15")
          .from(plate, { opacity: 0, scale: 0.8, duration: 0.3 }, "<")
          .from(candleBody, { scaleY: 0, transformOrigin: "bottom", duration: 0.35 })
          .from(candleWick, { opacity: 0, duration: 0.15 });

        if (els.flame && els.glow) {
            tl.to([els.flame, els.glow], {
                opacity: 1, scale: 1, duration: 0.4,
                onComplete() {
                    if (isDestroyed) return;
                    if (transitionTo(STATES.CAKE_READY)) {
                        showMic();
                    }
                }
            });
        } else {
            tl.call(() => {
                if (isDestroyed) return;
                if (transitionTo(STATES.CAKE_READY)) {
                    showMic();
                }
            });
        }
    }

    function showMic() {
        if (!els.micBtn) return;
        els.micBtn.classList.remove("mic-hidden");
        els.micBtn.style.display = "inline-flex";
        els.micBtn.addEventListener("click", activateMicrophone, { once: true });
    }

    async function activateMicrophone() {
        if (!els.micBtn) return;
        
        try {
            const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtxClass) throw new Error("Audio API unsupported");
            audioContext = new AudioCtxClass();

            microphoneStream = await navigator.mediaDevices.getUserMedia({ 
                audio: { echoCancellation: true, noiseSuppression: true } 
            });

            if (audioContext.state === "suspended") {
                await audioContext.resume();
            }

            els.micBtn.classList.add("mic-hidden");
            if (els.blowInstruction) els.blowInstruction.textContent = "Make a Wish... Blow the Candle";

            analyser = audioContext.createAnalyser();
            analyser.fftSize = 512;
            analyser.smoothingTimeConstant = 0.2;

            freqData = new Uint8Array(analyser.frequencyBinCount);
            timeData = new Uint8Array(analyser.fftSize);

            microphoneNode = audioContext.createMediaStreamSource(microphoneStream);
            microphoneNode.connect(analyser);

            micStartTime = performance.now();
            emaFreqVol = 0;
            emaRMS = 0;
            blowStarted = 0;

            if (transitionTo(STATES.LISTENING_MIC)) {
                detectBlow();
            }
        } catch (e) {
            if (microphoneNode && analyser) {
                microphoneNode.disconnect(analyser);
                microphoneNode = null;
            }
            if (analyser) {
                analyser.disconnect();
                analyser = null;
            }

            if (microphoneStream) {
                microphoneStream.getTracks().forEach(t => t.stop());
                microphoneStream = null;
            }

            if (audioContext && audioContext.state !== "closed") {
                await audioContext.close().catch(() => {});
                audioContext = null;
            }

            if (els.blowInstruction) {
                els.blowInstruction.innerHTML = "Microphone Permission Denied<br>Click the Candle Instead";
            }

            if (els.flame) {
                els.flame.style.cursor = "pointer";
                els.flame.addEventListener("click", extinguishCandle, { once: true });
            }
        }
    }

    function detectBlow() {
        if (currentState !== STATES.LISTENING_MIC || isDestroyed || !analyser || !freqData || !timeData) return;

        analyser.getByteFrequencyData(freqData);

        let lowFreqSum = 0;
        for (let i = 0; i < CONFIG.LOW_BINS_COUNT; i++) lowFreqSum += freqData[i];
        const rawFreqVol = lowFreqSum / CONFIG.LOW_BINS_COUNT;

        analyser.getByteTimeDomainData(timeData);

        let rmsSum = 0;
        for (let i = 0; i < timeData.length; i++) {
            const val = (timeData[i] - 128) / 128;
            rmsSum += val * val;
        }
        const rawRMS = Math.sqrt(rmsSum / timeData.length);

        emaFreqVol = CONFIG.EMA_ALPHA * rawFreqVol + (1 - CONFIG.EMA_ALPHA) * emaFreqVol;
        emaRMS = CONFIG.EMA_ALPHA * rawRMS + (1 - CONFIG.EMA_ALPHA) * emaRMS;

        const elapsedTime = performance.now() - micStartTime;
        if (elapsedTime < CONFIG.CALIBRATION_DURATION_MS) {
            ambientNoiseFloorFreq = 0.15 * rawFreqVol + 0.85 * ambientNoiseFloorFreq;
            ambientNoiseFloorRMS = 0.15 * rawRMS + 0.85 * ambientNoiseFloorRMS;
            blowFrameId = requestAnimationFrame(detectBlow);
            return;
        }

        const requiredFreq = Math.max(95, ambientNoiseFloorFreq * 1.8);
        const requiredRMS = Math.max(0.08, ambientNoiseFloorRMS * 1.6);

        if (emaFreqVol >= requiredFreq && emaRMS >= requiredRMS) {
            if (!blowStarted) blowStarted = performance.now();

            if (performance.now() - blowStarted > 350) {
                extinguishCandle();
                return;
            }
        } else {
            blowStarted = 0;
        }

        blowFrameId = requestAnimationFrame(detectBlow);
    }

    async function extinguishCandle() {
        if (!transitionTo(STATES.CANDLE_EXTINGUISHED)) return;

        playCandleBreeze();

        if (blowFrameId) cancelAnimationFrame(blowFrameId);

        if (els.flame) {
            els.flame.style.pointerEvents = "none";
            gsap.set(els.flame, { clearProps: "transform" });
        }
        if (els.glow) {
            gsap.set(els.glow, { clearProps: "transform" });
        }

        if (microphoneNode && analyser) {
            microphoneNode.disconnect(analyser);
            microphoneNode = null;
        }
        if (analyser) {
            analyser.disconnect();
            analyser = null;
        }

        if (microphoneStream) {
            microphoneStream.getTracks().forEach(t => t.stop());
            microphoneStream = null;
        }

        if (audioContext && audioContext.state !== "closed") {
            audioContext.close().catch(() => {});
            audioContext = null;
        }

        const tl = createTimeline();

        if (els.flame && els.glow) {
            tl.to([els.flame, els.glow], { opacity: 0, scale: 0, duration: 0.3 });
        }

        tl.call(showSmoke)
          .call(() => {
              // إظهار زر إعادة إشعال الشمعة
              const relightBtn = rootElement.querySelector("#relight-candle-btn");
              if (relightBtn) {
                  relightBtn.classList.remove("relight-hidden");
                  relightBtn.onclick = () => {
                      relightCandle();
                  };
              }

              // إظهار نافذة الأمنية للنجوم
              showWishModal();
          });
    }

    function relightCandle() {
        if (els.flame && els.glow) {
            gsap.to([els.flame, els.glow], { opacity: 1, scale: 1, duration: 0.5 });
            els.flame.style.pointerEvents = "auto";
            els.flame.style.cursor = "pointer";
            els.flame.addEventListener("click", extinguishCandle, { once: true });
        }
        const relightBtn = rootElement.querySelector("#relight-candle-btn");
        if (relightBtn) relightBtn.classList.add("relight-hidden");
        if (els.blowInstruction) {
            els.blowInstruction.style.display = "block";
            els.blowInstruction.textContent = "Make a Wish... Blow the Candle";
        }
        currentState = STATES.CAKE_READY;
    }

    function showWishModal() {
        const modal = rootElement.querySelector("#wish-modal");
        if (!modal) {
            proceedWithCelebration();
            return;
        }

        modal.classList.remove("wish-modal--hidden");
        const sendBtn = modal.querySelector("#send-wish-btn");
        const skipBtn = modal.querySelector("#skip-wish-btn");
        const wishInput = modal.querySelector("#wish-input");

        let proceeded = false;

        function proceedWithCelebration() {
            if (proceeded) return;
            proceeded = true;
            modal.classList.add("wish-modal--hidden");

            // تشغيل بالونات القلوب والألعاب النارية الباستيل
            const stopBalloons = startBalloonsAndFireworks();
            if (typeof stopBalloons === "function") {
                standaloneTweens.push({ kill: stopBalloons });
            }

            const audio = getAudioInstance();
            if (!audio.paused) audio.pause();
            audio.currentTime = 0;
            audio.play().catch(() => {
                console.log("[Audio] Autoplay Policy Blocked");
            });

            setTimeout(() => {
                showCinematicEnding();
            }, 800);
        }

        if (sendBtn) {
            sendBtn.onclick = () => {
                const wish = wishInput ? wishInput.value.trim() : "";
                if (wish) {
                    try { localStorage.setItem("roro_secret_wish", wish); } catch (e) {}
                }
                playMagicChime();
                proceedWithCelebration();
            };
        }

        if (skipBtn) {
            skipBtn.onclick = () => {
                proceedWithCelebration();
            };
        }
    }

    function showSmoke() {
        if (!els.smoke) return;
        els.smoke.style.display = "block";
        trackTween(gsap.fromTo(els.smoke,
            { opacity: 0.8, y: 0, scale: 0.6 },
            { opacity: 0, y: -50, scale: 1.8, duration: 2, ease: "power2.out", onComplete: () => els.smoke.style.display = "none" }
        ));
    }

    function showCinematicEnding() {
        if (els.blowInstruction) els.blowInstruction.style.display = "none";
        transitionTo(STATES.ENDED);

        if (els.cinematicEnding) {
            els.cinematicEnding.classList.add("cinematic-ending-stage--active");

            const letterCard = els.cinematicEnding.querySelector(".cinematic-letter-card");
            const titleEl = els.cinematicEnding.querySelector(".cinematic-letter-card__title");
            const bodyEl = els.cinematicEnding.querySelector(".cinematic-letter-card__body");
            const footerEl = els.cinematicEnding.querySelector(".cinematic-letter-card__footer");
            const nextBtn = els.cinematicEnding?.querySelector(SELECTORS.nextMemoryBtn);

            // 1. بصمة التوقيع الرومانسية
            const seal = els.cinematicEnding?.querySelector("#fingerprint-seal");
            if (seal) {
                if (localStorage.getItem("roro_letter_sealed") === "true") {
                    seal.classList.add("sealed");
                }

                let sealTimer = null;
                const startHold = (e) => {
                    e.preventDefault();
                    if (seal.classList.contains("sealed")) return;
                    seal.classList.add("holding");
                    sealTimer = setTimeout(() => {
                        seal.classList.remove("holding");
                        seal.classList.add("sealed");
                        playSealStamp();
                        try { localStorage.setItem("roro_letter_sealed", "true"); } catch (err) {}
                        confetti({
                            particleCount: 50,
                            spread: 70,
                            origin: { y: 0.8 },
                            colors: ['#e9c46a', '#ff5f9e', '#ffffff']
                        });
                    }, 1200);
                };

                const endHold = () => {
                    seal.classList.remove("holding");
                    if (sealTimer) clearTimeout(sealTimer);
                };

                seal.addEventListener("pointerdown", startHold);
                seal.addEventListener("pointerup", endHold);
                seal.addEventListener("pointerleave", endHold);
            }

            // 2. وضع إطفاء الأنوار السينمائي
            const dimBtn = els.cinematicEnding?.querySelector("#dim-lights-btn");
            if (dimBtn) {
                const stageRoot = rootElement.querySelector('[data-element="stage-root"]');
                dimBtn.addEventListener("click", () => {
                    if (stageRoot) {
                        stageRoot.classList.toggle("dim-lights-active");
                        const isActive = stageRoot.classList.contains("dim-lights-active");
                        dimBtn.textContent = isActive ? "☀️ Normal" : "🌙 Dim Lights";
                    }
                });
            }

            // 3. زر حفظ وتحميل الرسالة كتذكار
            const downloadBtn = els.cinematicEnding?.querySelector("#download-letter-btn");
            if (downloadBtn) {
                downloadBtn.addEventListener("click", async () => {
                    downloadBtn.disabled = true;
                    const originalText = downloadBtn.innerHTML;
                    downloadBtn.innerHTML = "⏳ Saving...";
                    try {
                        await downloadLetterKeepsake();
                        playMagicChime();
                        confetti({
                            particleCount: 45,
                            spread: 60,
                            origin: { y: 0.8 },
                            colors: ['#ff99b6', '#ffd1dc', '#e9c46a']
                        });
                        downloadBtn.innerHTML = "✓ Saved!";
                    } catch (e) {
                        console.error(e);
                        downloadBtn.innerHTML = originalText;
                    } finally {
                        setTimeout(() => {
                            downloadBtn.innerHTML = originalText;
                            downloadBtn.disabled = false;
                        }, 2200);
                    }
                });
            }

            // 4. زر اللقطة السينمائية الختامية
            if (nextBtn) {
                nextBtn.addEventListener("click", () => {
                    stopAllAudio();

                    createCinematicTransition(
                        () => {
                            destroy();
                            stopAllAudio();
                            navigate(Login);
                        },
                        () => {
                            startBackgroundMusic();
                        }
                    );
                });
            }

            if (letterCard) {
                gsap.fromTo(letterCard,
                    { opacity: 0, y: -80, rotate: -6, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        rotate: 2,
                        scale: 1,
                        duration: 0.9,
                        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
                        delay: 0.4,
                        onComplete: () => {
                            startTypewriterEffect(titleEl, bodyEl, footerEl);
                        }
                    }
                );
            }
        }
    }

    function startTypewriterEffect(titleEl, bodyEl, footerEl) {
        const titleText = "Happy Birthday Roro ❤️";
        const bodyText = `I hope this new year of your life brings you happiness, success, and everything you’ve been hoping to achieve.

Before anything else, I want you to know that I made this website especially for you. I didn’t want your birthday to pass with just a regular message, so I wanted to create something different — something that carries my time, effort, and thought. Something you can look at and feel that it was made for you, because you truly are someone special to me.

Ever since you became a part of my life, you’ve become one of the closest people to me. You’re one of the people I enjoy talking to the most, and I always look forward to our conversations and the laughs we share. Seeing you happy genuinely makes me happy, and knowing that your day went well always puts a smile on my face. Your presence has become a beautiful part of my everyday life, and I truly appreciate that.

That’s why I sincerely hope you always stay happy, and that God grants you everything you wish for. I hope He guides you through every step ahead, and I hope to always see you becoming the most successful and talented engineer, Roro. ❤️

Happy Birthday again, Rony. I hope this year becomes the beginning of many beautiful things that you truly deserve. ❤️`;

        if (titleEl) titleEl.textContent = "";
        if (bodyEl) bodyEl.innerHTML = '<span class="typewriter-cursor"></span>';

        let tIndex = 0;
        let bIndex = 0;

        function typeTitle() {
            if (tIndex < titleText.length) {
                titleEl.textContent += titleText.charAt(tIndex);
                tIndex++;
                letterTypewriterTimeout = setTimeout(typeTitle, 35);
            } else {
                letterTypewriterTimeout = setTimeout(typeBody, 400);
            }
        }

        function typeBody() {
            if (bIndex < bodyText.length) {
                const currentText = bodyText.substring(0, bIndex + 1);
                bodyEl.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="typewriter-cursor"></span>';
                
                const scrollContainer = els.cinematicEnding?.querySelector(".cinematic-letter-card__body-scroll-container");
                if (scrollContainer) {
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                }

                bIndex++;
                letterTypewriterTimeout = setTimeout(typeBody, 30);
            } else {
                const cursor = bodyEl.querySelector('.typewriter-cursor');
                if (cursor) cursor.remove();
                
                if (footerEl) {
                    footerEl.classList.add("cinematic-letter-card__footer--visible");
                }
                setTimeout(() => {
                    fireMegaConfetti();
                }, 300);
            }
        }

        typeTitle();
    }

    function setupFloatingBokeh() {
        if (!els.starsCanvas || !rootElement.contains(els.starsCanvas)) return;

        const ctx = els.starsCanvas.getContext("2d");
        if (!ctx) return;

        let lastW = window.innerWidth;
        let lastH = window.innerHeight;

        const count = window.innerWidth < 768 ? CONFIG.PARTICLE_COUNT_MOBILE : CONFIG.PARTICLE_COUNT_DESKTOP;
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 4 + 2,
            alpha: Math.random() * 0.25 + 0.08,
            speedY: -(Math.random() * 0.25 + 0.05)
        }));

        resizeHandler = () => {
            const dpr = window.devicePixelRatio || 1;
            const w = window.innerWidth;
            const h = window.innerHeight;

            els.starsCanvas.width = w * dpr;
            els.starsCanvas.height = h * dpr;
            els.starsCanvas.style.width = `${w}px`;
            els.starsCanvas.style.height = `${h}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            lastW = w;
            lastH = h;
        };

        resizeHandler();
        window.addEventListener("resize", resizeHandler);

        function animateBokeh() {
            if (isDestroyed || !els.starsCanvas || !rootElement.contains(els.starsCanvas)) {
                if (resizeHandler) window.removeEventListener("resize", resizeHandler);
                return;
            }

            const w = els.starsCanvas.clientWidth || window.innerWidth;
            const h = els.starsCanvas.clientHeight || window.innerHeight;

            ctx.clearRect(0, 0, els.starsCanvas.width, els.starsCanvas.height);

            particles.forEach(p => {
                p.y += p.speedY;
                if (p.y < -20) {
                    p.y = h + 20;
                    p.x = Math.random() * w;
                }

                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = CONFIG.COLORS.pink;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            particleAnimationId = requestAnimationFrame(animateBokeh);
        }

        animateBokeh();
    }

    function fireSparkles() {
        confetti({ 
            particleCount: 20, 
            spread: 40, 
            startVelocity: 10, 
            origin: { y: 0.6 }, 
            colors: [CONFIG.COLORS.pink, CONFIG.COLORS.white, CONFIG.COLORS.gold], 
            scalar: 0.7 
        });
    }

    function fireMegaConfetti() {
        confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.7 },
            colors: [CONFIG.COLORS.pink, CONFIG.COLORS.gold, '#ffffff']
        });
    }

    function destroy() {
        isDestroyed = true;
        if (letterTypewriterTimeout) clearTimeout(letterTypewriterTimeout);

        activeTimelines.forEach(tl => tl.kill());
        activeTimelines.length = 0;

        flameTweens.forEach(t => t.kill());
        flameTweens.length = 0;

        standaloneTweens.forEach(t => t.kill());
        standaloneTweens.length = 0;

        if (particleAnimationId) cancelAnimationFrame(particleAnimationId);
        if (resizeHandler) window.removeEventListener("resize", resizeHandler);
        if (confettiIntervalId) clearInterval(confettiIntervalId);
        if (blowFrameId) cancelAnimationFrame(blowFrameId);

        if (microphoneNode && analyser) {
            microphoneNode.disconnect(analyser);
        }
        if (microphoneStream) {
            microphoneStream.getTracks().forEach(t => t.stop());
        }
        if (audioContext && audioContext.state !== "closed") {
            audioContext.close().catch(() => {});
        }
        if (birthdayAudio) {
            birthdayAudio.pause();
            birthdayAudio.currentTime = 0;
            birthdayAudio = null;
        }
    }

    return destroy;
}