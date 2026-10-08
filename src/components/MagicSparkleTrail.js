// Interactive Magic Sparkle & Heart Particle Trail for Cursor & Touch
let initialized = false;
let lastSpawnTime = 0;

export function initMagicSparkleTrail() {
    if (initialized || typeof window === "undefined") return;
    initialized = true;

    const canvas = document.createElement("canvas");
    canvas.id = "magic-trail-canvas";
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "99998";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const colors = ["#ff5f9e", "#ffb3c7", "#ffd1dc", "#e9c46a", "#ffffff", "#ff80bf"];
    const shapes = ["star", "heart", "sparkle"];

    function spawn(x, y) {
        const now = performance.now();
        if (now - lastSpawnTime < 16) return; // ~60fps throttle
        lastSpawnTime = now;

        const count = Math.random() > 0.5 ? 2 : 1;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: x + (Math.random() * 12 - 6),
                y: y + (Math.random() * 12 - 6),
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.8) * 1.8,
                size: Math.random() * 10 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                alpha: 1,
                decay: Math.random() * 0.02 + 0.025,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.1
            });
        }
    }

    window.addEventListener("mousemove", (e) => spawn(e.clientX, e.clientY), { passive: true });
    window.addEventListener("touchmove", (e) => {
        if (e.touches && e.touches[0]) {
            spawn(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    function drawHeart(c, x, y, size) {
        c.beginPath();
        const topCurveHeight = size * 0.3;
        c.moveTo(x, y + topCurveHeight);
        c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
        c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.2, x, y + size);
        c.bezierCurveTo(x, y + (size + topCurveHeight) / 1.2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
        c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
        c.closePath();
        c.fill();
    }

    function drawStar(c, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = (Math.PI / 2) * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        c.beginPath();
        c.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            c.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            c.lineTo(x, y);
            rot += step;
        }
        c.lineTo(cx, cy - outerRadius);
        c.closePath();
        c.fill();
    }

    function loop() {
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;
            p.rotation += p.rotSpeed;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);

            if (p.shape === "heart") {
                drawHeart(ctx, 0, -p.size / 2, p.size);
            } else if (p.shape === "star") {
                drawStar(ctx, 0, 0, 4, p.size / 2, p.size / 5);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        requestAnimationFrame(loop);
    }

    loop();
}
