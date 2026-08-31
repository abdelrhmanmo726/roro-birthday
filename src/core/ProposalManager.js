import { gsap } from "gsap";
import confetti from "canvas-confetti";

export function initProposal() {
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const titleEl = document.getElementById("proposal-title");
  const messageEl = document.getElementById("proposal-message");
  const area = document.querySelector(".proposal-buttons");
  const card = document.querySelector(".proposal-container");

  // عناصر الـ HUD
  const bpmValue = document.getElementById("bpm-value");
  const ecgLine = document.getElementById("ecg-line");
  const statReaction = document.getElementById("stat-reaction");
  const statSpeed = document.getElementById("stat-speed");
  const statAttempts = document.getElementById("stat-attempts");

  if (!yesBtn || !noBtn || !area || !messageEl || !titleEl || !card) return;

  let typing = false;
  let attempts = 0;
  let lastMoveTime = Date.now();
  let lastMouseX = 0;
  let lastMouseY = 0;
  let isAccepted = false;

  const messages = [
    "Really? 🥺",
    "Think again ❤️",
    "Come on 😭",
    "You can't catch me 😜",
    "Too slow 😂",
    "Press YES ❤️",
    "I'm faster 🏃",
    "Almost 😏",
    "Never 😝",
    "Just say YES 🥹",
    "You're adorable 😂"
  ];

  // GSAP Entrance
  gsap.from([card, ".hud-box"], {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
  });

  gsap.to(".proposal-image", {
    scale: 1.05,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // تسلسل كتابة النص: العنوان أولاً ثم الرسالة
  typeElementText(titleEl, "Will you be my MJ? ❤️", 40, () => {
    typeElementText(messageEl, "I have something important to ask... ❤️", 35);
  });

  document.addEventListener("mousemove", handleGlobalMouse);

  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveButtonRandomly();
  });

  yesBtn.addEventListener("click", acceptLove);

  // متابعة حركة الماوس لحساب النبض والسرعات
  function handleGlobalMouse(e) {
    if (isAccepted) return;

    const now = Date.now();
    const dt = (now - lastMoveTime) / 1000;
    
    if (dt > 0.02) {
      const distMouse = Math.hypot(e.clientX - lastMouseX, e.clientY - lastMouseY);
      const speedPx = distMouse / dt;
      
      if (speedPx > 50) {
        statReaction.textContent = `${dt.toFixed(2)}s`;
        const machSpeed = (speedPx / 1000).toFixed(1);
        statSpeed.textContent = `Mach ${machSpeed}`;
      }

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      lastMoveTime = now;
    }

    const yesRect = yesBtn.getBoundingClientRect();
    const yesCX = yesRect.left + yesRect.width / 2;
    const yesCY = yesRect.top + yesRect.height / 2;
    const distToYes = Math.hypot(e.clientX - yesCX, e.clientY - yesCY);

    const maxDist = 400;
    const clampedDist = Math.min(distToYes, maxDist);
    const bpmProgress = 1 - clampedDist / maxDist;
    const currentBPM = Math.round(72 + bpmProgress * 88);

    bpmValue.textContent = currentBPM;

    const animDuration = Math.max(0.3, 1.2 - bpmProgress * 0.9);
    ecgLine.style.animationDuration = `${animDuration}s`;
    
    const glowOpacity = 0.2 + bpmProgress * 0.8;
    bpmValue.style.textShadow = `0 0 15px rgba(255, 51, 133, ${glowOpacity})`;

    escapeMouse(e);
  }

  function escapeMouse(e) {
    const rect = noBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const distance = Math.hypot(e.clientX - cx, e.clientY - cy);

    if (distance < 140) {
      moveButton(e.clientX, e.clientY);
    }
  }

  function moveButton(mouseX, mouseY) {
    attempts++;
    statAttempts.textContent = attempts;

    const areaRect = area.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const cx = btnRect.left + btnRect.width / 2;
    const cy = btnRect.top + btnRect.height / 2;

    let dx = cx - mouseX;
    let dy = cy - mouseY;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;

    let currentX = btnRect.left - areaRect.left;
    let currentY = btnRect.top - areaRect.top;

    let targetX = currentX + (dx / len) * 160;
    let targetY = currentY + (dy / len) * 160;

    const maxX = areaRect.width - btnRect.width;
    const maxY = areaRect.height - btnRect.height;

    if (targetX < 0 || targetX > maxX || targetY < 0 || targetY > maxY) {
      targetX = Math.random() * maxX;
      targetY = Math.random() * maxY;
    }

    gsap.to(noBtn, {
      left: targetX,
      top: targetY,
      duration: 0.25,
      ease: "power2.out"
    });

    typeElementText(messageEl, messages[Math.floor(Math.random() * messages.length)], 30);

    gsap.fromTo(
      yesBtn,
      { scale: 1 },
      { scale: 1.1, duration: 0.15, repeat: 1, yoyo: true, ease: "power2.out" }
    );

    gsap.fromTo(
      card,
      { rotation: -1, x: -3 },
      { rotation: 1, x: 3, duration: 0.05, repeat: 3, yoyo: true, clearProps: "transform" }
    );
  }

  function moveButtonRandomly() {
    attempts++;
    statAttempts.textContent = attempts;

    const areaRect = area.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = areaRect.width - btnRect.width;
    const maxY = areaRect.height - btnRect.height;

    gsap.to(noBtn, {
      left: Math.random() * maxX,
      top: Math.random() * maxY,
      duration: 0.2,
      ease: "power2.out"
    });
  }

  // دالة كتابة النصوص المرنة
  function typeElementText(element, text, speed = 35, callback = null) {
    if (typing) return;
    typing = true;
    element.textContent = "";

    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        typing = false;
        if (callback) callback();
      }
    }, speed);
  }

  function acceptLove() {
    isAccepted = true;
    document.removeEventListener("mousemove", handleGlobalMouse);

    bpmValue.textContent = "180";
    bpmValue.style.color = "#00ffcc";
    bpmValue.style.textShadow = "0 0 20px #00ffcc";

    gsap.to(noBtn, {
      scale: 0,
      opacity: 0,
      duration: 0.3
    });

    gsap.fromTo(
      card,
      { scale: 1 },
      { scale: 1.05, duration: 0.3, repeat: 1, yoyo: true }
    );

    gsap.fromTo(
      yesBtn,
      { scale: 1 },
      { scale: 1.2, duration: 0.25, repeat: 1, yoyo: true }
    );

    typeElementText(messageEl, "YAAAAAY ❤️", 35, () => {
      setTimeout(() => {
        typeElementText(messageEl, "You made my day ❤️", 35);
      }, 1000);
    });

    fireConfetti();
  }

  function fireConfetti() {
    const end = Date.now() + 3000;

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0 }
      });

      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}