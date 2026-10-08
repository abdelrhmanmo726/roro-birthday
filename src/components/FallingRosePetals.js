// 3D Realistic Falling Rose Petals Canvas
let canvas = null;
let ctx = null;
let animId = null;

export function initFallingRosePetals() {
    if (canvas || typeof window === "undefined") return;

    canvas = document.createElement("canvas");
    canvas.className = "rose-petals-canvas";
    document.body.prepend(canvas);

    ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 14 : 26;

    const petals = Array.from({ length: count }, () => createPetal(width, height, true));

    function createPetal(w, h, randomY = false) {
        return {
            x: Math.random() * w,
            y: randomY ? Math.random() * h : -30 - Math.random() * 50,
            size: Math.random() * 14 + 12,
            speedY: Math.random() * 0.9 + 0.6,
            speedX: Math.random() * 0.6 - 0.3,
            rotX: Math.random() * Math.PI,
            rotY: Math.random() * Math.PI,
            rotZ: Math.random() * Math.PI,
            rotSpeedX: (Math.random() - 0.5) * 0.03,
            rotSpeedY: (Math.random() - 0.5) * 0.03,
            rotSpeedZ: (Math.random() - 0.5) * 0.02,
            phase: Math.random() * Math.PI * 2,
            color1: "#ff6b8b",
            color2: "#d81b60"
        };
    }

    let time = 0;

    function drawPetal(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotZ);
        ctx.scale(Math.cos(p.rotX), Math.sin(p.rotY));

        const grad = ctx.createRadialGradient(0, -p.size * 0.2, 2, 0, 0, p.size);
        grad.addColorStop(0, p.color1);
        grad.addColorStop(0.7, p.color2);
        grad.addColorStop(1, "#880e4f");

        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(180, 20, 80, 0.35)";
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.9, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.6, 0, -p.size);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    function loop() {
        ctx.clearRect(0, 0, width, height);
        time += 0.015;

        petals.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX + Math.sin(time + p.phase) * 0.7;

            p.rotX += p.rotSpeedX;
            p.rotY += p.rotSpeedY;
            p.rotZ += p.rotSpeedZ;

            if (p.y > height + 40) {
                Object.assign(p, createPetal(width, height, false));
            }
            if (p.x < -40) p.x = width + 30;
            if (p.x > width + 40) p.x = -30;

            drawPetal(p);
        });

        animId = requestAnimationFrame(loop);
    }

    loop();
}
