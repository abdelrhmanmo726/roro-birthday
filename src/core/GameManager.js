import {
    playClick,
    playDelete,
    playSuccess,
    playError,
    startBackgroundMusic,
    stopBackgroundMusic
} from "./AudioManager";

import { navigate } from "./Router";

import {
    animateLogin,
    animateButtonPress,
    playWrongAnimation,
    playSuccessAnimation
} from "./AnimationManager";

import { Puzzle1 } from "../pages/Puzzle1";

const SECRET_CODE = "10112005";

let currentCode = [];
let activeKeyHandler = null;

export function initLogin() {
    const boxes = document.querySelectorAll(".code-box");
    const numberButtons = document.querySelectorAll("[data-value]");
    const deleteBtn = document.getElementById("delete-btn");
    const enterBtn = document.getElementById("enter-btn");
    const card = document.querySelector(".login-card");

    if (!boxes.length || !enterBtn) return;

    currentCode = [];

    // تشغيل أنيميشن الدخول الجميل للوجن
    animateLogin();

    function render() {
        boxes.forEach((box, index) => {
            box.textContent = currentCode[index] || "";
            box.style.color = "#ffffff";
        });
    }

    function handleInput(val) {
        startBackgroundMusic();
        playClick();
        if (currentCode.length >= SECRET_CODE.length) return;
        currentCode.push(val);
        render();
    }

    function handleDelete() {
        startBackgroundMusic();
        playDelete();
        currentCode.pop();
        render();
    }

    function handleEnter() {
        startBackgroundMusic();

        if (currentCode.length < SECRET_CODE.length) return;

        if (currentCode.join("") === SECRET_CODE) {
            playSuccess();
            playSuccessAnimation(card, boxes);

            if (activeKeyHandler) {
                window.removeEventListener("keydown", activeKeyHandler);
                activeKeyHandler = null;
            }

            setTimeout(() => {
                stopBackgroundMusic();
                navigate(Puzzle1);
            }, 900);

        } else {
            playError();
            playWrongAnimation(card, boxes);
            currentCode = [];

            setTimeout(() => {
                render();
            }, 450);
        }
    }

    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            animateButtonPress(button);
            handleInput(button.dataset.value);
        });
    });

    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            animateButtonPress(deleteBtn);
            handleDelete();
        });
    }

    if (enterBtn) {
        enterBtn.addEventListener("click", () => {
            animateButtonPress(enterBtn);
            handleEnter();
        });
    }

    // دعم لوحة المفاتيح في الكمبيوتر
    if (activeKeyHandler) {
        window.removeEventListener("keydown", activeKeyHandler);
    }
    activeKeyHandler = (e) => {
        if (!document.querySelector(".login-card")) {
            window.removeEventListener("keydown", activeKeyHandler);
            activeKeyHandler = null;
            return;
        }

        if (e.key >= "0" && e.key <= "9") {
            const btn = document.querySelector(`[data-value="${e.key}"]`);
            if (btn) animateButtonPress(btn);
            handleInput(e.key);
        } else if (e.key === "Backspace") {
            if (deleteBtn) animateButtonPress(deleteBtn);
            handleDelete();
        } else if (e.key === "Enter") {
            if (enterBtn) animateButtonPress(enterBtn);
            handleEnter();
        }
    };
    window.addEventListener("keydown", activeKeyHandler);

    render();
}