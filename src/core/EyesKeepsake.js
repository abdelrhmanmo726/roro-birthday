import eyesImage from "../assets/images/eyes.jpg";

// Generate and download a breathtaking cinematic keepsakes card for the eyes scene
export async function downloadEyesKeepsake() {
    if (document.fonts) {
        try {
            await document.fonts.ready;
        } catch (e) {}
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = eyesImage;

    await new Promise((resolve) => {
        if (img.complete && img.naturalWidth > 0) resolve();
        else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
        }
    });

    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Deep Obsidian Cinema Velvet Background
    const bg = ctx.createRadialGradient(800, 500, 100, 800, 600, 1000);
    bg.addColorStop(0, "#1a0b14");
    bg.addColorStop(0.6, "#0a0407");
    bg.addColorStop(1, "#000000");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1600, 1200);

    // 2. Golden Filigree Border Frame
    ctx.strokeStyle = "rgba(233, 196, 106, 0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, 1500, 1100);

    ctx.strokeStyle = "rgba(255, 182, 193, 0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(62, 62, 1476, 1076);

    // 3. Draw Eyes Photo in Widescreen 16:9 Letterbox
    const photoW = 1400;
    const photoH = 787.5; // 1400 * 9 / 16
    const photoX = (1600 - photoW) / 2;
    const photoY = 110;

    ctx.save();
    // Rounded corners for photo
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoW, photoH, 12);
    ctx.clip();
    ctx.drawImage(img, photoX, photoY, photoW, photoH);

    // Warm radial vignette overlay over photo
    const vig = ctx.createRadialGradient(800, photoY + photoH / 2, 200, 800, photoY + photoH / 2, 800);
    vig.addColorStop(0, "rgba(255, 200, 220, 0.05)");
    vig.addColorStop(0.7, "rgba(0, 0, 0, 0.2)");
    vig.addColorStop(1, "rgba(0, 0, 0, 0.65)");
    ctx.fillStyle = vig;
    ctx.fillRect(photoX, photoY, photoW, photoH);
    ctx.restore();

    // Golden frame around photo
    ctx.strokeStyle = "rgba(233, 196, 106, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoW, photoH, 12);
    ctx.stroke();

    // 4. Romantic Quotes
    ctx.save();
    ctx.textAlign = "center";

    // English Quote
    ctx.font = "italic 34px 'Playfair Display', Georgia, serif";
    ctx.fillStyle = "#fff0f5";
    ctx.shadowColor = "rgba(255, 182, 193, 0.5)";
    ctx.shadowBlur = 14;
    ctx.fillText("“ I find myself getting lost in your eyes... ”", 800, 980);

    // Date
    ctx.font = "600 17px 'Poppins', sans-serif";
    ctx.fillStyle = "#baa0ad";
    ctx.shadowColor = "transparent";
    ctx.fillText("November 10, 2026", 800, 1035);
    ctx.restore();

    // 5. Signature
    ctx.save();
    ctx.font = "italic 40px 'Alex Brush', cursive";
    ctx.fillStyle = "#ff6b8b";
    ctx.textAlign = "right";
    ctx.fillText("— Abdelrhman", 1450, 1110);
    ctx.restore();

    // 6. Download Trigger
    const link = document.createElement("a");
    link.download = "Roro-Eyes-Memory.png";
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
}
