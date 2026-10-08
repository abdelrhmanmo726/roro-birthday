// Web Audio API Synthesizer for Immersive Sound Effects without external asset dependencies
let audioCtx = null;

function getContext() {
    if (!audioCtx) {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
            audioCtx = new AudioCtxClass();
        }
    }
    if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
    }
    return audioCtx;
}

// 1. صوت الرنين السحري (Magic Chime) عند فتح الهدية وإرسال الأمنية
export function playMagicChime() {
    try {
        const ctx = getContext();
        if (!ctx) return;

        const frequencies = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
        const now = ctx.currentTime;

        frequencies.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);

            gain.gain.setValueAtTime(0, now + idx * 0.08);
            gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 1.3);
        });
    } catch (e) {
        console.warn("[SFX] Chime blocked", e);
    }
}

// 2. صوت تثبيت قطعة البازل (Puzzle Snap)
export function playPuzzleSnap() {
    try {
        const ctx = getContext();
        if (!ctx) return;

        const now = ctx.currentTime;

        // Wood / tactile click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.1);

        // Chime echo
        const chime = ctx.createOscillator();
        const chimeGain = ctx.createGain();

        chime.type = "sine";
        chime.frequency.setValueAtTime(880, now + 0.02);

        chimeGain.gain.setValueAtTime(0.15, now + 0.02);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

        chime.connect(chimeGain);
        chimeGain.connect(ctx.destination);

        chime.start(now + 0.02);
        chime.stop(now + 0.36);
    } catch (e) {
        console.warn("[SFX] Snap blocked", e);
    }
}

// 3. صوت نفخة الهواء اللطيفة (Soft Breeze) عند إطفاء الشمعة
export function playCandleBreeze() {
    try {
        const ctx = getContext();
        if (!ctx) return;

        const bufferSize = ctx.sampleRate * 0.5; // 0.5 sec of noise
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        // Bandpass filter for breath / wind sound
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(ctx.currentTime);
        noise.stop(ctx.currentTime + 0.5);
    } catch (e) {
        console.warn("[SFX] Breeze blocked", e);
    }
}

// 4. صوت ختم البصمة (Wax Seal Stamp)
export function playSealStamp() {
    try {
        const ctx = getContext();
        if (!ctx) return;

        const now = ctx.currentTime;

        // Warm thump
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.22);

        // Golden bell sparkle
        playMagicChime();
    } catch (e) {
        console.warn("[SFX] Seal blocked", e);
    }
}

// 5. صوت نبضات القلب الرومانسية (Heartbeat Pulse)
export function playHeartbeat(vol = 0.5) {
    try {
        const ctx = getContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // Pulse 1: "Lub"
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(65, now);
        osc1.frequency.exponentialRampToValueAtTime(36, now + 0.14);

        gain1.gain.setValueAtTime(vol, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.16);

        // Pulse 2: "Dub"
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(54, now + 0.18);
        osc2.frequency.exponentialRampToValueAtTime(30, now + 0.32);

        gain2.gain.setValueAtTime(vol * 0.72, now + 0.18);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.34);

        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.18);
        osc2.stop(now + 0.35);
    } catch (e) {
        console.warn("[SFX] Heartbeat blocked", e);
    }
}

// 6. لحن البيانو السينمائي الرومانسي لمشهد العينين (Cinematic Ambient Piano)
let cinematicAudioInterval = null;
let cinematicActiveNodes = [];

export function startCinematicPianoSoundscape() {
    stopCinematicPianoSoundscape();
    try {
        const ctx = getContext();
        if (!ctx) return;

        // Chords: Cmaj9, G/B, Am9, Fmaj7
        const chords = [
            [130.81, 196.00, 246.94, 293.66, 329.63], // C3, G3, B3, D4, E4
            [123.47, 196.00, 246.94, 293.66, 392.00], // B2, G3, B3, D4, G4
            [110.00, 164.81, 220.00, 261.63, 329.63], // A2, E3, A3, C4, E4
            [87.31, 130.81, 174.61, 220.00, 261.63]   // F2, C3, F3, A3, C4
        ];

        let chordIdx = 0;

        function playNextChord() {
            if (!ctx) return;
            const now = ctx.currentTime;
            const chord = chords[chordIdx % chords.length];
            chordIdx++;

            chord.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const filter = ctx.createBiquadFilter();

                osc.type = i === 0 ? "sine" : "triangle";
                osc.frequency.setValueAtTime(freq, now + i * 0.08);

                filter.type = "lowpass";
                filter.frequency.setValueAtTime(1200, now);

                const noteGain = i === 0 ? 0.22 : 0.08;
                gain.gain.setValueAtTime(0, now + i * 0.08);
                gain.gain.linearRampToValueAtTime(noteGain, now + i * 0.08 + 0.8);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 4.2);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + i * 0.08);
                osc.stop(now + i * 0.08 + 4.5);
                cinematicActiveNodes.push({ osc, gain });
            });
        }

        playNextChord();
        cinematicAudioInterval = setInterval(playNextChord, 3600);
    } catch (e) {
        console.warn("[SFX] Cinematic music blocked", e);
    }
}

export function stopCinematicPianoSoundscape() {
    if (cinematicAudioInterval) {
        clearInterval(cinematicAudioInterval);
        cinematicAudioInterval = null;
    }
    cinematicActiveNodes.forEach(({ osc, gain }) => {
        try {
            if (audioCtx) {
                gain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
                setTimeout(() => {
                    try { osc.stop(); } catch(e) {}
                }, 500);
            } else {
                osc.stop();
            }
        } catch(e) {}
    });
    cinematicActiveNodes = [];
}
