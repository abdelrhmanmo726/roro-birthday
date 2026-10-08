import cardImage from "../assets/images/card.png";

// Helper function to split text into lines matching max width
function wrapText(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0] || "";

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + " " + word;
        const width = ctx.measureText(testLine).width;
        if (width <= maxWidth) {
            currentLine = testLine;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine) {
        lines.push(currentLine);
    }
    return lines;
}

// Generate and download a high-resolution keepsake using the EXACT card image and layout
export async function downloadLetterKeepsake() {
    // 1. Wait for web fonts so typography renders with 100% fidelity
    if (document.fonts) {
        try {
            await document.fonts.ready;
        } catch (e) {
            console.warn("Fonts ready timeout:", e);
        }
    }

    // 2. Load the exact card image (card.png)
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = cardImage;

    await new Promise((resolve, reject) => {
        if (img.complete && img.naturalWidth > 0) {
            resolve();
        } else {
            img.onload = () => resolve();
            img.onerror = () => {
                console.error("Failed to load card.png for keepsake");
                resolve(); // proceed anyway
            };
        }
    });

    // 3. Create canvas matching natural card dimensions (1024 x 1536)
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1536;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw the authentic card design
    ctx.drawImage(img, 0, 0, 1024, 1536);

    // 4. Draw Date
    ctx.save();
    ctx.fillStyle = "#8C6272";
    ctx.font = "600 16px 'Poppins', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("November 10, 2026", 512, 236);
    ctx.restore();

    // 5. Draw Title
    ctx.save();
    ctx.fillStyle = "#D85C8A";
    ctx.font = "bold 34px 'Playfair Display', serif";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(216, 92, 138, 0.28)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    ctx.fillText("Happy Birthday Roro ❤️", 512, 286);
    ctx.restore();

    // 6. Draw Body Paragraphs onto the lined parchment
    const paragraphs = [
        "I hope this new year of your life brings you happiness, success, and everything you’ve been hoping to achieve.",
        "Before anything else, I want you to know that I made this website especially for you. I didn’t want your birthday to pass with just a regular message, so I wanted to create something different — something that carries my time, effort, and thought. Something you can look at and feel that it was made for you, because you truly are someone special to me.",
        "Ever since you became a part of my life, you’ve become one of the closest people to me. You’re one of the people I enjoy talking to the most, and I always look forward to our conversations and the laughs we share. Seeing you happy genuinely makes me happy, and knowing that your day went well always puts a smile on my face. Your presence has become a beautiful part of my everyday life, and I truly appreciate that.",
        "That’s why I sincerely hope you always stay happy, and that God grants you everything you wish for. I hope He guides you through every step ahead, and I hope to always see you becoming the most successful and talented engineer, Roro. ❤️",
        "Happy Birthday again, Rony. I hope this year becomes the beginning of many beautiful things that you truly deserve. ❤️"
    ];

    ctx.save();
    ctx.fillStyle = "#422935";
    ctx.font = "21px 'Cormorant Garamond', Georgia, serif";
    ctx.textAlign = "left";

    const leftMargin = 160;
    const maxTextWidth = 704; // 864 - 160
    const lineHeight = 35;
    const paragraphGap = 16;
    let currentY = 348;

    paragraphs.forEach((p) => {
        const lines = wrapText(ctx, p, maxTextWidth);
        lines.forEach((line) => {
            ctx.fillText(line, leftMargin, currentY);
            currentY += lineHeight;
        });
        currentY += paragraphGap;
    });
    ctx.restore();

    // 7. Draw Romantic Handwritten Signature
    ctx.save();
    ctx.fillStyle = "#c2185b";
    ctx.font = "italic 44px 'Alex Brush', cursive";
    ctx.textAlign = "left";
    ctx.fillText("Abdelrhman", 180, currentY + 30);
    ctx.restore();

    // 8. Seal Touch (if sealed)
    const isSealed = localStorage.getItem("roro_letter_sealed") === "true";
    if (isSealed) {
        ctx.save();
        ctx.font = "600 13px 'Poppins', sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 4;
        ctx.fillText("Roro ❤️", 788, 1375);
        ctx.restore();
    }

    // 9. Trigger high quality download
    const link = document.createElement("a");
    link.download = "Roro-Birthday-Letter.png";
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
}
