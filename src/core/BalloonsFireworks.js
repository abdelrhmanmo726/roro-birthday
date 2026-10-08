// Floating 3D Heart Balloons and Pastel Fireworks Canvas
let canvas = null;
let ctx = null;
let animId = null;

export function startBalloonsAndFireworks() {
    canvas = document.getElementById("balloons-canvas");
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const balloons = [];
    const fireworks = [];
    const colors = ["#ff5f9e", "#ff8fab", "#ffb3c7", "#e9c46a", "#c77dff", "#a2d2ff"];

    // Spawn 15-22 heart balloons
    for (let i = 0; i < 20; i++) {
        balloons.push({
            x: Math.random() * width,
            y: height + Math.random() * 300 + 40,
            size: Math.random() * 20 + 26,
            speedY: Math.random() * 1.5 + 1.2,
            swing: Math.random() * 2 + 1,
            swingSpeed: Math.random() * 0.03 + 0.015,
            phase: Math.random() * Math.PI * 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    // Spawn periodic fireworks
    function createFirework() {
        const x = Math.random() * (width * 0.8) + width * 0.1;
        const y = Math.random() * (height * 0.45) + 60;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const particleCount = 28;

        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 / particleCount) * i;
            const speed = Math.random() * 3.5 + 1.5;
            fireworks.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color,
                alpha: 1,
                decay: Math.random() * 0.018 + 0.015
            });
        }
    }

    const fireworkInterval = setInterval(createFirework, 700);
    createFirework();

    function drawHeartBalloon(c, x, y, size, color) {
        c.save();
        c.translate(x, y);

        const grad = c.createRadialGradient(-size * 0.2, -size * 0.2, 2, 0, 0, size);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.35, color);
        grad.addColorStop(1, "#880e4f");

        c.fillStyle = grad;
        c.shadowColor = color;
        c.shadowBlur = 12;

        c.beginPath();
        const top = size * 0.3;
        c.moveTo(0, top);
        c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, top);
        c.bezierCurveTo(-size / 2, (size + top) / 2, 0, (size + top) / 1.15, 0, size * 1.05);
        c.bezierCurveTo(0, (size + top) / 1.15, size / 2, (size + top) / 2, size / 2, top);
        c.bezierCurveTo(size / 2, 0, 0, 0, 0, top);
        c.closePath();
        c.fill();

        // Balloon string
        c.beginPath();
        c.moveTo(0, size * 1.05);
        c.quadraticCurveTo(size * 0.2, size * 1.4, -size * 0.1, size * 1.8);
        c.strokeStyle = "rgba(255, 255, 255, 0.4)";
        c.lineWidth = 1;
        c.stroke();

        c.restore();
    }

    let time = 0;

    function loop() {
        ctx.clearRect(0, 0, width, height);
        time += 0.02;

        // Draw Balloons
        balloons.forEach(b => {
            b.y -= b.speedY;
            const swingX = b.x + Math.sin(time * b.swingSpeed * 60 + b.phase) * b.swing * 10;
            drawHeartBalloon(ctx, swingX, b.y, b.size, b.color);
        });

        // Draw Fireworks
        for (let i = fireworks.length - 1; i >= 0; i--) {
            const f = fireworks[i];
            f.x += f.vx;
            f.y += f.vy;
            f.vy += 0.04; // gravity
            f.alpha -= f.decay;

            if (f.alpha <= 0) {
                fireworks.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = Math.max(0, f.alpha);
            ctx.fillStyle = f.color;
            ctx.shadowColor = f.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(f.x, f.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        animId = requestAnimationFrame(loop);
    }

    loop();

    return function stop() {
        if (animId) cancelAnimationFrame(animId);
        if (fireworkInterval) clearInterval(fireworkInterval);
        if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
}
